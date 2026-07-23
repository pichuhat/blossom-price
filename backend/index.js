const express = require("express")
const app = express()
const path = require("path")

const axios = require("axios")
require('dotenv').config()

const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const { Pool } = require("pg")

const cors = require('cors');
const { rejects } = require("assert")
const { getPackedSettings } = require("http2")
const { rawListeners } = require("cluster")

const { verifyKeyMiddleware, InteractionType, InteractionResponseType } = require('discord-interactions');
const { EmbedBuilder } = require('discord.js');
const { resolveSoa } = require("dns")

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended for Supabase production connections to avoid drops
  ssl: { rejectUnauthorized: false } 
});

app.post('/api/discord/interactions', verifyKeyMiddleware(process.env.IS_DEV === 'production' ? process.env.DISCORD_PUBLIC_KEY : process.env.TEST_PUBLIC_KEY), async (req, res) => {
        const interaction = req.body

        if (interaction.type === InteractionType.PING) {
            return res.send({type: InteractionResponseType.PONG})
        }

        if (interaction.type === InteractionType.APPLICATION_COMMAND) {
            const { name } = interaction.data;

            switch (name) {
                case 'ping': 
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: { content: 'Guh' }
                })

                case 'greet': {
                    const userOption = interaction.data.options?.find(opt => opt.name === 'user');
                    const userId = userOption?.value;

                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: { content: `guh <@${userId}>` }
                    })
                }

                case 'get-item':
                case 'lookup': {
                    const itemOption = interaction.data.options?.find(opt => opt.name === 'item')
                    const itemId = itemOption?.value

                    const serverOption = interaction.data.options?.find(opt => opt.name === 'server')
                    const serverId = serverOption?.value

                    const itemData = await getItemData(itemId, serverId)

                    if (!itemData) return res.send({type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, data: {content: `Couldn't find that item.`}})

                    const unixSeconds = itemData.recom_timestamp ? Math.floor(itemData.recom_timestamp.getTime() / 1000) : 0
                    
                    const servers = ['Cherry', 'Spirit', 'Lotus', 'Tulip']

                    const embed = new EmbedBuilder()
                        .setColor(0xbc2bc4)
                        .setImage(`https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${itemId}.png`)
                        .setFooter({ text: `Data from BlossomPricer by pichuhat.\nItem descriptions are from the Blossom Item Catalog.`})

                    if (itemData.price) {
                        embed.setDescription(`# [${itemData.item_name}](https://bc.pichuhat.dev/~/server/${serverId}/item/${itemId})\n${servers[Number(serverId)]} Price${itemData.is_range ? ` Range` : ''}: **$${Number(itemData.price).toLocaleString()}${itemData.is_range ? ` to $${Number(itemData.max_price).toLocaleString()}` : ''} **\nSubmitted: **<t:${unixSeconds}:f>**`)

                        if (itemData.avatar_hash) {
                        const avatarURL = `https://cdn.discordapp.com/avatars/${itemData.author_id}/${itemData.avatar_hash}.${itemData.avatar_hash.startsWith('a_') ? `gif` : `png`}`
                        console.log(avatarURL)
                        embed.setAuthor({name: `${itemData.username} (via BlossomPricer)`, iconURL: avatarURL})
                    } else {
                        embed.setAuthor({name: `${itemData.username} (via BlossomPricer)`})
                    }
                    
                } else {
                    embed.setDescription(`# [${itemData.item_name}](https://bc.pichuhat.dev/~/server/${serverId}/item/${itemId})\n**Couldn't find a price for this item.**`)
                }

                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: { embeds: [embed] }
                    })
                }
            }
        }

        if (interaction.type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE) {
            const focusedOption = interaction.data.options.find(opt => opt.focused);
            const searchTerm = focusedOption?.value ?? '';
            if (interaction.data.name !== 'lookup' || focusedOption?.name !== 'item') return res.send({
                type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
                data: { choices: [] }
            })

            const results = await pgPool.query(`SELECT id, item_name FROM items WHERE item_name ILIKE $1 ORDER BY id LIMIT 25`, [`%${searchTerm}%`])

            return res.send({
                type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
                data: {
                    choices: results.rows.map(row => ({
                        name: row.item_name,
                        value: String(row.id)
                    }))
                }
            })
        }
    })

app.use(
    '/src', 
    express.static(path.join(__dirname, "..", "frontend", "src"))
);

app.use(express.json())

app.set('trust proxy', true)

async function syncItems() {
    try {
        console.log("Beginning new item update...")

        const endpointURL = "https://www.blossom.atn.gg/api/items"
        console.log("Fetching latest item set from URL " + endpointURL)

        const response = await fetch(endpointURL, {
  method: "GET",
  headers: {
    "I-INCLUDED-INFO": "id;CrateID;TagPrimary;TagSecondary;TagTertiary;TagQuaternary;TagQuinary;TagSenary;TagSeptenary;WinPercentage;RarityHuman;ItemName;ItemHTML;ConnectedItems;ItemHuman;ItemNameHTML",
        }
    })
    const result = await response.json()
    const final = result.data

    console.log("Fetched, sending payload...")

    const sqlQuery = `
    INSERT INTO items (
        id, crate_id, item_name, item_html, rarity_human, win_chance, tags, updated_at, item_human, item_name_html
    )
    SELECT * FROM (
        SELECT 
            (obj->>'id')::INT AS id,
            (obj->>'CrateID')::INT AS crate_id,
            obj->>'ItemName' AS item_name,
            obj->>'ItemHTML' AS item_html,
            obj->>'RarityHuman' AS rarity_human,
            (NULLIF(obj->>'WinPercentage', ''))::NUMERIC AS win_chance,
            ARRAY_REMOVE(
                ARRAY[
                    NULLIF(obj->>'TagPrimary', ''),
                    NULLIF(obj->>'TagSecondary', ''),
                    NULLIF(obj->>'TagTertiary', ''),
                    NULLIF(obj->>'TagQuaternary', ''),
                    NULLIF(obj->>'TagQuinary', ''),
                    NULLIF(obj->>'TagSenary', ''),
                    NULLIF(obj->>'TagSeptenary', '')
                ], 
                NULL
            ) AS generated_tags,
            NOW() AS updated_at,
            obj->>'ItemHuman' AS item_human,
            obj->>'ItemNameHTML' AS item_name_html
        FROM jsonb_array_elements($1::jsonb) AS obj
    ) subquery
    WHERE NOT ('Repeat Appearance' = ANY(subquery.generated_tags))
    ON CONFLICT (id) DO UPDATE 
    SET 
        crate_id = EXCLUDED.crate_id,
        item_name = EXCLUDED.item_name,
        item_html = EXCLUDED.item_html,
        rarity_human = EXCLUDED.rarity_human,
        win_chance = EXCLUDED.win_chance,
        tags = EXCLUDED.tags,
        updated_at = EXCLUDED.updated_at,
        item_human = EXCLUDED.item_human,
        item_name_html = EXCLUDED.item_name_html;
`;

        await pgPool.query(sqlQuery, [JSON.stringify(final)])

        console.log("SUCCESS: Database updated")
    } catch(error) {
        console.error("FAILED: " + error)
    } finally {
        console.log("Function complete")
    }
}

async function getItemData(id, server) {
    if (![0,1,2,3].includes(Number(server)) || isNaN(Number(id))) return false

    const sqlQuery = `
            SELECT DISTINCT ON (i.id)
            i.*,
            p.price AS price,
            p.timestamp AS recom_timestamp,
            p.submission_id AS recommendation_id,
            p.submitted_by AS author_id,
            p.server_id AS server,
            p.is_range AS is_range,
            p.max_price AS max_price,
            u.username AS username,
            u.discord_avatar_hash AS avatar_hash
            FROM items i
            LEFT JOIN price_submissions p ON i.id = p.item_id
            AND p.status='accepted'
            AND p.server_id = $1
            LEFT JOIN users u ON p.submitted_by = u.discord_id
            WHERE i.id = $2
            ORDER BY i.id, p.timestamp DESC;
        `

        try {
            const result = await pgPool.query(sqlQuery, [server, id])
            return result.rows[0]
    } catch(err) {
        console.error(err)
        return false
    }
}

async function getTags() {
    try {
        const fetchURL = "https://www.blossom.atn.gg/api/tags"
        const response = await fetch(fetchURL)
        const result = await response.json()
        result.push('spawner', 'currency')
        const index = result.indexOf('Repeat Appearance')
        if (index > -1) result.splice(index, 1)
        return result
    } catch(e) {
        console.log(`ERROR: tag fetch failed: ${e}`)
    }
}

const isProduction = process.env.IS_DEV === 'production'

app.use(session({
    // Tell express-session to use PostgreSQL instead of server RAM
    store: new pgSession({
        pool : pgPool,
        tableName : 'user_sessions'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax'
    }
}));

app.use("/static", express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {
    res.redirect(301, '/~')
})

app.get('/api/auth/callback', async (req, res) => {
    const code = req.query.code; // Discord sent this to you
    
    if (!code) {
        return res.status(400).send('Missing authorization code.');
    }

    let checkA = false

    try {
        const redirect = `${req.protocol}://${req.get('X-Forwarded-Host') || req.get('host')}/api/auth/callback`
        // 1. Exchange the temporary code for a permanent Access Token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        checkA = true;

        const guildMemberResponse = await axios.get(
            `https://discord.com/api/users/@me/guilds/${process.env.MINECRAFT_GUILD_ID}/member`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        checkA = false;

        // Extract their verified info
        const memberData = guildMemberResponse.data;
        const minecraftUsername = memberData.nick;
        const discordId = memberData.user.id;
        const roles = memberData.roles

        if (!roles.includes("822640342335356980")) return res.redirect("/?linkPopup=1")

        const dbresult = await pgPool.query(
            `INSERT INTO users (discord_id, username) 
             VALUES ($1, $2) 
             ON CONFLICT (discord_id) 
             DO UPDATE SET username = EXCLUDED.username, updated_at = CURRENT_TIMESTAMP
             RETURNING discord_id, username, role`,
            [discordId, minecraftUsername]
        );

        const confirmationUser = dbresult.rows[0]

        req.session.user = {
            id: discordId,
            username: minecraftUsername,
            role: confirmationUser.role
        };

        try {
            await new Promise((resolve, reject) => {
                req.session.save((err) => (err ? reject(err) : resolve()));
            });
            console.log(`Saved session for ${minecraftUsername}`);
        } catch (err) {
            console.error('Session save error:', err);
            return res.status(500).send('Error saving session.');
        }

        console.log(`Verified user: ${minecraftUsername} (${discordId})`);
        
        res.redirect("/")
} catch(error) {
    if (checkA) {
        res.redirect("/?linkPopup=2")
    } else {
    res.send("Uh Oh! " + error)
    }
}
})

app.get('/api/ping', (req, res) => {
    res.status(200).send("guh")
})

app.get('/api/auth/me', (req, res) => {
    if (req.session && req.session.user) {
        console.log(req.session.user)
        res.json({
            loggedIn: true,
            user: req.session.user.username,
            role: req.session.user.role
        })
    } else {
        console.log("🌸 User with no auth")
        res.status(401).json({loggedIn: false, message: "Improper or nonexistent authentication"})
    }
})

app.get('/api/allitems', async (req, res) => {
    try {
    const page = parseInt(req.query.page, 10) || 1
    const limit = 20
    const offset = (page-1)*limit;

    if (req.query.selectedServer && ![0, 1, 2, 3].includes(Number(req.query.selectedServer))) return res.status(400).json({success: false, message: "invalid subserver ID"})

    const sqlQuery = `${req.query.selectedServer ? `
    SELECT DISTINCT ON (i.id)
    i.*,
    p.price AS price,
    p.timestamp AS recom_timestamp,
    p.submission_id AS recommendation_id,
    p.submitted_by AS author_id,
    p.server_id AS server,
    p.is_range AS is_range,
    p.max_price AS max_price,
    u.username AS username
    FROM items i
    LEFT JOIN price_submissions p ON i.id = p.item_id
    AND p.status='accepted'
    AND p.server_id = $3
    LEFT JOIN users u ON p.submitted_by = u.discord_id
    ORDER BY i.id, p.timestamp DESC
    LIMIT $1 OFFSET $2
    `
    : `
    SELECT * FROM items i
    ORDER BY i.id ASC
    LIMIT $1 OFFSET $2
    `}
    `
    const values = [limit, offset]
    if (req.query.selectedServer) values.push(req.query.selectedServer)
    const result = await pgPool.query(sqlQuery, values)

    res.json({success: true, items: result.rows})
    } catch(error) {
        console.error("Allitems query failed: " + error)
        res.status(500).json({success: false, message: "Failed to fetch items", items: null})
    }
})

    app.get('/api/forceupdate', async (req, res) => {
        if (req.session && req.session.user) {
            if (req.session.user.role == "admin") {
                console.log("Forced sync starting...")
                try {
                await syncItems()
                res.status(200).json({success: true, message: "Updated"})
                } catch(error) {
                    console.log(error)
                    res.status(500).json({success: false, message: "Unknown not-auth error"})
                }
            } else {
                res.status(403).json({success: false, message: "Improper permission"})
            }
        } else {
            res.status(401).json({success: false, message: "Not logged in"})
        }
    })

    app.get("/api/pagecount", async (req, res) => {
        const sqlQuery = `
        SELECT COUNT(*) AS total FROM items
        `

        try {
        const final = await pgPool.query(sqlQuery)
        const count = Math.ceil(parseInt(final.rows[0].total, 10)/20);
        res.status(200).json({success: true, count: count})
        } catch(error) {
            return res.status(500).json({success: false, count: null})
        }
    })

    app.get("/api/item/:serverid/:itemid", async (req, res) => {
        const serverToGet = req.params.serverid
        const idToGet = req.params.itemid
        if (![0,1,2,3].includes(Number(serverToGet)) || isNaN(Number(idToGet))) return res.status(400).json({success: false, message: "Bad input"})

        const data = await getItemData(idToGet, serverToGet)

        if (data) {
            return res.status(200).json({success: true, item: data})
        } else {
            return res.status(500).json({success: true, message: "internal server error"})
        }
    })

    app.get('/api/itemhistory/:serverid/:itemid', async (req, res) => {
        const serverToGet = req.params.serverid
        const idToGet = req.params.itemid
        const sqlQuery = `
        SELECT
        i.*,
        p.price AS price,
        p.timestamp AS recom_timestamp,
        p.submission_id AS recommendation_id,
        p.submitted_by AS author_id,
        p.server_id AS server,
        p.status AS status,
        p.is_range AS is_range,
        p.max_price AS max_price,
        u.username AS username
        FROM price_submissions p
        LEFT JOIN items i ON i.id = p.item_id
        AND p.status='accepted'
        AND p.server_id= $1
        LEFT JOIN users u ON p.submitted_by = u.discord_id
        WHERE i.id = $2
        ORDER BY i.id, recom_timestamp DESC;
        `

        try {
        const result = await pgPool.query(sqlQuery, [serverToGet, idToGet])
        res.status(200).json({success: true, history: result.rows})
        } catch(err) {
            res.status(500).json({success: false, message: `query error: ${err}`, history: null})
        }
    })

    app.post('/api/recommend', async (req, res) => {
        const input = req.body
        if (req.session?.user?.role == 'staff' || req.session?.user?.role == 'admin') {
            if (!input.item_id || !req.session.user.id || (input.is_range && isNaN(Number(input.max_price))) || isNaN(Number(input.price)) || ![0,1,2,3].includes(input.server_id)) return res.status(400).json("Missing, mismatched, or invalid params")
            input.price = Number(input.price)
            input.max_price = Number(input.max_price)
            const sqlQuery = input.is_range ? `
            INSERT INTO price_submissions (item_id, server_id, submitted_by, price, status, is_range, max_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            ` : `
            INSERT INTO price_submissions (item_id, server_id, submitted_by, price, status, is_range)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `
             if (input.is_range && input.price == input.max_price) return res.status(400).json({success: false, message: "min and max prices must be different"})
            if (input.is_range && input.price > input.max_price) {
                [input.price, input.max_price] = [input.max_price, input.price]
            }

            const values = [input.item_id, input.server_id, req.session.user.id, input.price, 'pending']
            if (req.body.is_range) {
                values.push(true, input.max_price)
            } else {
                values.push(false)
            }

            try {

            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, message: "Uploaded"})

            } catch(err) {
                res.status(500).json({success: false, message: "Upload error"})
            }

        } else {
            res.status(403).json({success: false, message: "Role required: staff"})
        }
    })

    app.post('/api/group-recommend', async (req, res) => {
        const input = req.body
        if (req.session?.user?.role == 'staff' || req.session?.user?.role == 'admin') {
            if (typeof input.item_id !== 'object' || input.item_id.length < 1 || !req.session.user.id || (input.is_range && isNaN(Number(input.max_price))) || isNaN(Number(input.price)) || ![0,1,2,3].includes(input.server_id)) return res.status(400).json("Missing, mismatched, or invalid params")
            input.price = Number(input.price)
            input.max_price = Number(input.max_price)
            input.item_id = input.item_id.map(String)
            const sqlQuery = input.is_range ? `
            INSERT INTO group_submissions (item_id, server_id, submitted_by, price, status, is_range, max_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            ` : `
            INSERT INTO group_submissions (item_id, server_id, submitted_by, price, status, is_range)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `

            const secondQuery = `
            INSERT INTO price_submissions (group_id, item_id, server_id, submitted_by, price, status, is_range${input.is_range ? `, max_price` : ""})
            SELECT
              gs.group_id,
              i.id,
              gs.server_id,
              gs.submitted_by,
              gs.price,
              gs.status,
              gs.is_range${input.is_range ? `, gs.max_price` : ''}
            FROM group_submissions gs
            CROSS JOIN LATERAL unnest(gs.item_id::INT[]) AS joined_item_id
            JOIN items i ON i.id = joined_item_id
            WHERE gs.group_id = $1
            `
             if (input.is_range && input.price == input.max_price) return res.status(400).json({success: false, message: "min and max prices must be different"})
            if (input.is_range && input.price > input.max_price) {
                [input.price, input.max_price] = [input.max_price, input.price]
            }

            const values = [input.item_id, input.server_id, req.session.user.id, input.price, 'pending']
            if (req.body.is_range) {
                values.push(true, input.max_price)
            } else {
                values.push(false)
            }

            try {

            const result = await pgPool.query(sqlQuery, values)
            const secondResult = await pgPool.query(secondQuery, [result.rows[0].group_id])
            res.status(200).json({success: true, message: "Uploaded"})

            } catch(err) {
                console.log(err)
                res.status(500).json({success: false, message: "Upload error"})
            }

        } else {
            res.status(403).json({success: false, message: "Role required: staff"})
        }
    })

    app.get('/api/myrecoms/listrecoms/:page', async (req, res) => {
        if (req.session?.user?.role == 'staff' || req.session?.user?.role == 'admin') {
            const type = req.query.type
            const page = Number(req.params.page)
            if (type && !['accepted', 'denied', 'pending'].includes(type) || isNaN(page)) return res.status(400).json({success: false, message: "Invalid input"})
            const limit = 100
            const offset = (page-1)*limit;
            const sqlQuery = `
            SELECT
            i.*,
            p.price AS price,
            p.timestamp AS recom_timestamp,
            p.submission_id AS recommendation_id,
            p.submitted_by AS author_id,
            p.server_id AS server,
            p.status AS status,
            p.is_range AS is_range,
            p.max_price AS max_price,
            u.username AS username
            FROM items i
            LEFT JOIN price_submissions p ON i.id = p.item_id
            LEFT JOIN users u ON p.submitted_by = u.discord_id
            WHERE p.submitted_by = $1
            AND p.group_id IS NULL
            ${type ? `AND status = $4` : ''}
            ORDER BY timestamp DESC
            LIMIT $2 OFFSET $3;
            `
            const data = [req.session.user.id, limit, offset]
            if (type) data.push(type)

            try {
                const result = await pgPool.query(sqlQuery, data)
                res.status(200).json({success: true, history: result.rows})
            } catch(err) {
                res.status(500).json({success: false, message: `ERROR: ${err}`, history: null})
            }
        } else {
            res.status(403).json({success: false, message: "Role required: staff"})
        }
    })

    app.get('/api/myrecoms/pagecount', async (req, res) => {
        if (req.session?.user?.role !== 'admin' && req.session?.user?.role !== 'staff') return res.status(403).json({success: false, message: "Unauthorized"})
        const type = req.query.type
        if (type && !['accepted', 'denied', 'pending'].includes(type)) return res.status(400).json({success: false, message: "Invalid status type"})
        const sqlQuery = `
        SELECT COUNT(*) AS recommendations
        FROM price_submissions
        WHERE submitted_by = $1
        AND group_id IS NULL
        ${type ? `AND status = $2` : ''}
        `
        const values = [String(req.session.user.id)]
        if (type) values.push(type)
        try {
            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, count: Math.ceil(Number(result.rows[0].recommendations/100))})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    app.get('/api/adminpanel/recoms/:page', async (req, res) => {
        const page = Number(req.params.page)
        const type = req.query.type || false
        if ((type && !['accepted', 'pending', 'denied'].includes(type)) || isNaN(page)) return res.status(400).json({success: false, message: "Invalid input"})
        const limit = 100
        const offset = (page-1)*limit;
        if (req.session?.user?.role == 'admin') {
            const sqlQuery = `
            SELECT
            i.*,
            p.price AS price,
            p.timestamp AS recom_timestamp,
            p.submission_id AS recommendation_id,
            p.submitted_by AS author_id,
            p.server_id AS server,
            p.status AS status,
            p.is_range AS is_range,
            p.max_price AS max_price,
            u.username AS username
            FROM price_submissions p
            LEFT JOIN items i ON i.id = p.item_id
            LEFT JOIN users u ON p.submitted_by = u.discord_id
            WHERE p.group_id IS NULL
            ${type ? `AND status = $3` : ''}
            ORDER BY timestamp DESC
            LIMIT $1 OFFSET $2;
            `
            const values = [limit, offset]
            if (type) values.push(type)

            try {
                const result = await pgPool.query(sqlQuery, values)
                res.status(200).json({success: true, history: result.rows})
            } catch(err) {
                res.status(500).json({success: false, message: `ERROR: ${err}`, history: null})
            }
        } else {
            res.status(403).json({success: false, message: "Role required: admin"})
        }
    })

    app.get('/api/adminpanel/pagecount', async (req, res) => {
        if (req.session?.user?.role !== 'admin') return res.status(403).json({success: false, message: "You aren't an admin buckaroo"})
        const type = req.query.type
        if (type && !['accepted', 'denied', 'pending'].includes(type)) return res.status(400).json({success: false, message: "Invalid status type"})
        const sqlQuery = `
        SELECT COUNT(*) AS recommendations
        FROM price_submissions
        WHERE group_id IS NULL
        ${type ? `AND status = $1` : ''}
        `
        const values = []
        if (type) values.push(type)
        try {
            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, count: Math.ceil(Number(result.rows[0].recommendations/100))})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    app.post('/api/adminpanel/updatestatus', async (req, res) => {
        if (req.session?.user?.role == 'admin') {
            const input = req.body
            if (!input.type || !input.submission_id || !['accepted', 'denied', 'pending'].includes(input.type)) return res.status(400).json({success: false, message: "Missing or invalid arguments"})
            const sqlQuery = `
            UPDATE price_submissions
            SET status = $1
            WHERE submission_id = $2
            `
            const data = [input.type, input.submission_id]

            try {
                const result = await pgPool.query(sqlQuery, data)
                res.status(200).json({success: true, message: "Updated"})
            } catch(error) {
                res.status(500).json({success: false, message: `ERROR: ${error}`})
            }
        } else {
            res.status(403).json({success: false, message: "Role required: admin"})
        }
    })

    app.get('/api/spawners', async (req, res) => {
            const sqlQuery = req.query.selectedServer != null
        ? `SELECT DISTINCT ON (i.id)
           i.*,
           p.price AS price,
           p.timestamp AS recom_timestamp,
           p.submission_id AS recommendation_id,
           p.submitted_by AS author_id,
           p.server_id AS server,
           p.is_range AS is_range,
           p.max_price AS max_price,
           u.username AS username
           FROM items i
           LEFT JOIN price_submissions p ON i.id = p.item_id
               AND p.status='accepted'
               AND p.server_id = $1
           LEFT JOIN users u ON p.submitted_by = u.discord_id
           WHERE 'spawner' = ANY(i.tags)
           ORDER BY i.id, p.timestamp DESC`
        : `SELECT * FROM items i
           WHERE 'spawner' = ANY(i.tags)
           ORDER BY i.id ASC`;

    const params = req.query.selectedServer != null ? [Number(req.query.selectedServer)] : [];

        try {
        const result = await pgPool.query(sqlQuery, params)
        res.status(200).json({success: true, items: result.rows})
        } catch(err) {
            res.status(500).json({success: false, message: "Error: " + err})
        }
    })

    app.get('/api/search/simple', async (req, res) => {
        const input = req.query.query
        const server = req.query.selectedServer
        if (!input || (server && isNaN(Number(server)))) return res.status(400).json({success: false, message: "Missing or invalid search param", result: null})
        const sqlQuery = `
        SELECT * FROM (
            SELECT DISTINCT ON (i.id)
                i.*,
                CASE 
                    WHEN to_tsvector('simple', item_human) @@ plainto_tsquery('simple', $1) THEN 'exact'
                    ELSE 'fuzzy'
                END as match_type,
            p.price AS price,
            p.timestamp AS recom_timestamp,
            p.submission_id AS recommendation_id,
            p.submitted_by AS author_id,
            p.server_id AS server,
            p.is_range AS is_range,
            p.max_price AS max_price,
            u.username AS username
            FROM items i
            LEFT JOIN price_submissions p ON i.id = p.item_id
            AND p.status='accepted'
            ${server ? `AND p.server_id = $2` : ""}
            LEFT JOIN users u ON p.submitted_by = u.discord_id
            WHERE 
                to_tsvector('simple', item_human) @@ plainto_tsquery('simple', $1)
                OR 
                to_tsvector('english', item_human) @@ plainto_tsquery('english', $1)
            ORDER BY i.id, p.timestamp DESC
        ) as search_results
        ORDER BY 
            CASE 
                WHEN match_type = 'exact' THEN 1 
                ELSE 2 
            END, id ASC
        LIMIT 151;
        `

        try {
            const values = [input]
            if (server) values.push(server)
            const result = await pgPool.query(sqlQuery, values)
            const truncated = result.rows.length > 150
            res.status(200).json({success: true, result: result.rows, truncated: truncated})
        } catch(err) {
            res.status(500).json({success: false, message: `Server ERR: ${err}`, result: null})
        }
    })

    app.get('/api/cratelist', async (req, res) => {
        const sqlQuery = `
        SELECT id, "CrateName"
        FROM crates
        ORDER BY id DESC
        `
        try {
            const result = await pgPool.query(sqlQuery)
            res.status(200).json({success: true, result: result.rows})
        } catch(err) {
            res.status(500).json({success: false, message: `Server ERR: ${err}`, result: null})
        }
    })

    app.get('/api/taglist', (req, res) => {
        res.status(200).json(tags)
    })

    app.get('/api/search/advanced', async (req, res) => {
        const input = req.query.query
        const server = req.query.selectedServer
        const crate = req.query.crate
        const tags = req.query.tags 
      ? (Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags]) 
      : [];
        if ((server && isNaN(Number(server))) || (crate && isNaN(Number(crate)))) return res.status(400).json({success: false, message: "Missing or invalid search param", result: null})
        // 1. Initialize the values array and the counter
const values = input ? [input] : [];
let paramIndex = input ? 2 : 1; 

// 2. Build the query pieces dynamically
let serverCondition = "";
if (server) {
    serverCondition = `LEFT JOIN price_submissions p ON  i.id = p.item_id AND p.status = 'accepted' AND p.server_id = $${paramIndex} LEFT JOIN users u ON p.submitted_by = u.discord_id`;
    values.push(Number(server));
    paramIndex++;
}

let crateCondition = "";
if (crate) {
    crateCondition = ` AND i.crate_id = $${paramIndex}`;
    values.push(Number(crate));
    paramIndex++;
}

let tagCondition = ""
if (tags) {
    tagCondition = ` AND tags @> $${paramIndex}::text[]`
    values.push(tags)
    paramIndex++
}

// 3. Construct the final SQL string
const sqlQuery = input ? `
SELECT * FROM (
    SELECT DISTINCT ON (i.id)
        i.*,
        CASE 
            WHEN to_tsvector('simple', item_human) @@ plainto_tsquery('simple', $1) THEN 'exact'
            ELSE 'fuzzy'
        END as match_type${serverCondition ? `, p.price AS price,
        p.timestamp AS recom_timestamp,
        p.submission_id AS recommendation_id,
        p.submitted_by AS author_id,
        p.server_id AS server,
        p.is_range AS is_range,
        p.max_price AS max_price,
        u.username AS username` : ""}
    FROM items i
    ${serverCondition}
    WHERE 
        (to_tsvector('simple', item_human) @@ plainto_tsquery('simple', $1)
        OR 
        to_tsvector('english', item_human) @@ plainto_tsquery('english', $1))
        ${crateCondition}
        ${tagCondition}
    ORDER BY i.id${serverCondition ? `, p.timestamp DESC` : ""}
) as search_results
ORDER BY 
    CASE 
        WHEN match_type = 'exact' THEN 1 
        ELSE 2 
    END, 
    id ASC
LIMIT 151;
` : `
SELECT DISTINCT ON (i.id)
        i.*${serverCondition ? `, p.price AS price,
        p.timestamp AS recom_timestamp,
        p.submission_id AS recommendation_id,
        p.submitted_by AS author_id,
        p.server_id AS server,
        p.is_range AS is_range,
        p.max_price AS max_price,
        u.username AS username` : ""}
FROM items i
${serverCondition}
WHERE i.id = i.id${crateCondition}${tagCondition}
ORDER BY i.id${serverCondition ? `, p.timestamp DESC` : ""}
LIMIT 151;
`;

        try {
            const result = await pgPool.query(sqlQuery, values);
            const truncated = result.rows.length > 150
            if (truncated) result.rows = result.rows.slice(0, 150)
            res.status(200).json({success: true, result: result.rows, truncated: truncated})
        } catch(e) {
            res.status(500).json({success: false, message: `Likely server error: ${e}`, result: null})
            console.log(e)
        }
    })

    app.get('/api/countprices', async (req, res) => {
        const sqlQuery = `
        SELECT COUNT(DISTINCT item_id)
        FROM price_submissions
        WHERE status = 'accepted'`
        try {
            const result = await pgPool.query(sqlQuery)
            res.status(200).json({success: true, result: result.rows[0].count})
        } catch(e) {
            res.status(500).json({success: false, message: `ERROR: ${e}`})
        }
    })

    app.get('/api/recents/:serverid', async (req, res) => {
        const server = Number(req.params.serverid)
        if (![0, 1, 2, 3].includes(server)) return res.status(400).json({message: "Invalid server id", success: false, result: null})
        const sqlQuery = `
        SELECT *
        FROM (
            SELECT DISTINCT ON (i.id)
                i.*,
                p.price AS price,
                p.timestamp AS recom_timestamp,
                p.submission_id AS recommendation_id,
                p.submitted_by AS author_id,
                p.server_id AS server,
                p.status AS status,
                p.is_range AS is_range,
                p.max_price AS max_price,
                u.username AS username
            FROM price_submissions p
            INNER JOIN items i ON i.id = p.item_id
            LEFT JOIN users u ON p.submitted_by = u.discord_id
            WHERE p.status = 'accepted'
            AND p.server_id = $1
            ORDER BY i.id, p.timestamp DESC
        ) sub
        ORDER BY recom_timestamp DESC
        LIMIT 10;    
        `
        const values = [server]
        try {
            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, result: result.rows})
        } catch(e) {
            res.status(500).json({success: false, result: null})
        }
    })

    app.get('/api/checkpending/:serverid/:itemid', async (req, res) => {
        if (req.session?.user?.role !== 'staff' && req.session?.user?.role !== 'admin') return res.status(401).json({success: false, message: "Role required: staff"})
        const server = Number(req.params.serverid)
        const item = Number(req.params.itemid)
        if (isNaN(server) || isNaN(item)) return res.status(400).json({success: false, message: "Server ID and Item ID must be numbers."})
        const sqlQuery = `
        SELECT COUNT(*) AS pending
        FROM price_submissions
        WHERE submitted_by = $1
        AND server_id = $2
        AND item_id = $3
        AND status = 'pending'
        `
        const values = [req.session.user.id, server, item]
        try {
        const result = await pgPool.query(sqlQuery, values)
        res.status(200).json({success: true, isPending: parseInt(result.rows[0].pending, 10) > 0})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error."})
        }
    })

    app.get('/api/groups/:page', async (req, res) => {
        if (req.session?.user?.role !== 'staff' && req.session?.user?.role !== 'admin') return res.status(401).json({success: false, message: "Role required: staff"})
        const adminview = !!JSON.parse(req.query.do_manage)
        if (adminview && req.session?.user?.role !== 'admin') return res.status(403).json({success: false, message: "Admin role required for management access"})
        let page = Number(req.params.page) || 1
        if (page > 100 || page < 1) page = 1;
        const limit = 100
        const offset = (page-1)*limit
        const sqlQuery = `
        SELECT
        gs.*,
        u.username AS username
        FROM group_submissions gs
        LEFT JOIN users u ON gs.submitted_by = u.discord_id
        ${adminview ? '' : `WHERE gs.submitted_by = $3`}
        LIMIT $1 OFFSET $2
        `
        const values = [limit, offset]
        if (!adminview) values.push(req.session.user.id)
        
        try {
            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, result: result.rows})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    app.get('/api/pagecount/groups', async (req, res) => {
        if (req.session?.user?.role !== 'staff' && req.session?.user?.role !== 'admin') return res.status(401).json({success: false, message: "Role required: staff"})
        const adminview = req.query.do_manage ? !!JSON.parse(req.query.do_manage) : false
        if (adminview && req.session?.user?.role !== 'admin') return res.status(403).json({success: false, message: "Admin role required for management access"})
        const sqlQuery = `
        SELECT COUNT(*) AS groups
        FROM group_submissions
        ${adminview ? '' : `WHERE submitted_by = $1`}    
        `
        const values = []
        if (!adminview) values.push(req.session.user.id)

        try {
            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, count: Math.ceil(result.rows[0].groups/100)})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    app.get('/api/viewgroup/:id', async (req, res) => {
        const group_id = Number(req.params.id)
        if (req.session?.user?.role !== 'staff' && req.session?.user?.role !== 'admin') return res.status(401).json({success: false, message: "Role required: staff"})
        if (isNaN(group_id)) return res.status(400).json({success: false, message: "Invalid group id"})
        const sqlQuery = `
        SELECT
        i.id,
        i.item_name,
        i.tags,
        i.updated_at,
        i.crate_id,
        i.win_chance,
        i.rarity_human,
        c."CrateName" AS crate_name
        FROM group_submissions gs
        CROSS JOIN LATERAL unnest(gs.item_id::INT[]) WITH ORDINALITY AS u(id, ord)
        JOIN items i ON i.id = u.id
        LEFT JOIN crates c ON i.crate_id = c.id
        WHERE gs.group_id = $1
        ORDER BY u.ord
        `

        try {
            const result = await pgPool.query(sqlQuery, [group_id])
            res.status(200).json({success: true, result: result.rows})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    app.post('/api/updatestatus/groups', async (req, res) => {
        if (req.session?.user?.role == 'admin') {
            const input = req.body
            if (!input.type || !input.submission_id || !['accepted', 'denied', 'pending'].includes(input.type)) return res.status(400).json({success: false, message: "Missing or invalid arguments"})
            const sqlQuery = `
            UPDATE group_submissions
            SET status = $1
            WHERE group_id = $2
            `
            const secondQuery = `
            UPDATE price_submissions
            SET status = $1
            WHERE group_id = $2
            `
            const data = [input.type, input.submission_id]

            try {
                const result = await pgPool.query(sqlQuery, data)
                const second = await pgPool.query(secondQuery, data)
                res.status(200).json({success: true, message: "Updated"})
            } catch(error) {
                res.status(500).json({success: false, message: `ERROR: ${error}`})
            }
        } else {
            res.status(403).json({success: false, message: "Role required: admin"})
        }
    })

    app.get('/api/itemorder/:direction', async (req, res) => {
        const direction = req.params.direction
        const id = req.query.id
        if (!['next', 'previous'].includes(direction)) return res.status(400).json({success: false, message: "Invalid direction"})
        if (!id || isNaN(id) || id < 1) return res.status(400).json({success: false, message: "Invalid item id"})
        const sqlQuery = `
        SELECT id
        FROM items
        WHERE id ${direction == 'next' ? '>' : '<'} $1
        ORDER BY id ${direction == 'next' ? 'ASC' : 'DESC'}
        LIMIT 1
        `
        try {
            const result = await pgPool.query(sqlQuery, [id])
            res.status(200).json({success: true, id: result.rows[0].id})
        } catch(e) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    })

    //   ----------------------------------------------------------------------
    //   [ ALL ENDPOINTS ABOVE THIS LINE                                      ]
    //   ----------------------------------------------------------------------

    app.get('/~/*any', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
    })

    app.get(['/~', '/~/'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

    app.get("/*any", (req, res) => {
        if (req.path.startsWith('/api') || req.path.includes('.') || req.path.startsWith('/~')) {
        return res.status(404).send("404 Unknown asset")
    }
        res.redirect(302, `/~${req.originalUrl}`)
    })

    let tags = []
app.listen(5000, '0.0.0.0', async () => {
    console.log("Fetching tags...")
    tags = await getTags()
    console.log(`BCpricer running at port 5000`);
});
