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

app.set('trust proxy', 1);

// 2. Configure strict, credential-safe CORS
app.use(cors({
    origin: ['https://bc-pricer.onrender.com', process.env.DEV_URL], 
    
    credentials: true,
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(
    '/src', 
    express.static(path.join(__dirname, "..", "frontend", "src"))
);

app.use(express.json())

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended for Supabase production connections to avoid drops
  ssl: { rejectUnauthorized: false } 
});

async function syncItems() {
    try {
        console.log("Beginning new item update...")

        const endpointURL = "https://www.blossom.atn.gg/api/items"
        console.log("Fetching latest item set from URL " + endpointURL)

        const response = await fetch(endpointURL, {
  method: "GET",
  headers: {
    "I-INCLUDED-INFO": "id;CrateID;TagPrimary;TagSecondary;TagTertiary;TagQuaternary;TagQuinary;TagSenary;TagSeptenary;WinPercentage;RarityHuman;ItemName;ItemHTML;ConnectedItems",
        }
    })
    const result = await response.json()
    const final = result.data

    console.log("Fetched, sending payload...")

    const sqlQuery = `
    INSERT INTO items (
        id, crate_id, item_name, item_html, rarity_human, win_chance, tags, updated_at
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
            NOW() AS updated_at
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
        updated_at = EXCLUDED.updated_at;
`;

        await pgPool.query(sqlQuery, [JSON.stringify(final)])

        console.log("SUCCESS: Database updated")
    } catch(error) {
        console.error("FAILED: " + error)
    } finally {
        console.log("Function complete")
    }
}

app.use(session({
    // Tell express-session to use PostgreSQL instead of server RAM
    store: new pgSession({
        pool : pgPool,                // Links to your Supabase connection pool
        tableName : 'user_sessions'   // The name of the table inside Supabase
    }),
    secret: process.env.SESSION_SECRET, // A long, random string inside your local .env
    resave: false,                      // Saves session only if modified (saves DB performance)
    saveUninitialized: false,           // Don't create empty sessions for guests
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie lasts for 30 days (in milliseconds)
        secure: true,
        httpOnly: true,                   // Protects cookie against malicious frontend scripts
        sameSite: 'none'                   // Essential for cross-site cookie security
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
        // 1. Exchange the temporary code for a permanent Access Token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        console.log("reached check step A")
        checkA = true;

        // 2. Ask Discord for the user's specific profile INSIDE your server
        const guildMemberResponse = await axios.get(
            `https://discord.com/api/users/@me/guilds/${process.env.MINECRAFT_GUILD_ID}/member`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        console.log("reached check step B")
        checkA = false;

        // Extract their verified info
        const memberData = guildMemberResponse.data;
        console.log(memberData)
        const minecraftUsername = memberData.nick;
        const discordId = memberData.user.id;
        const roles = memberData.roles

        if (!roles.includes("822640342335356980")) return res.redirect(frontendHost + "/?linkPopup=1")

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

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Error saving session.');
            }
            console.log(`Saved session for ${minecraftUsername} to Supabase!`);
        })

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
        res.status(401).json({loggedIn: false, message: "Improper or nonexistent authentication"})
    }
})

app.get('/api/allitems', async (req, res) => {
    try {
    const page = parseInt(req.query.page, 10) || 1
    const limit = 20
    const offset = (page-1)*limit;

    const sqlQuery = `
    SELECT * FROM items
    ORDER BY id ASC
    LIMIT $1 OFFSET $2
    `
    const result = await pgPool.query(sqlQuery, [limit, offset])

    res.json({success: true, items: result.rows})
    } catch(error) {
        console.error("Allitems query failed: " + error)
        res.status(500).json({success: false, message: "Failed to fetch items", items: null})
    }
})

    app.get('/api/forceupdate', async (req, res) => {
        if (req.session && req.session.user) {
            console.log(req.session.user.role)
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
        const sqlQuery = `
            SELECT DISTINCT ON (i.id)
            i.*,
            p.price AS price,
            p.timestamp AS recom_timestamp,
            p.submission_id AS recommendation_id,
            p.submitted_by AS author_id,
            p.server_id AS server,
            u.username AS username
            FROM items i
            LEFT JOIN price_submissions p ON i.id = p.item_id
            AND p.status='accepted'
            AND p.server_id = $1
            LEFT JOIN users u ON p.submitted_by = u.discord_id
            WHERE i.id = $2
            ORDER BY i.id, p.timestamp DESC;
        `

        try {
            console.log("reached A")
    const result = await pgPool.query(sqlQuery, [serverToGet, idToGet])

    console.log(result.rows[0])
    res.status(200).json({success: true, item: result.rows[0]})
    } catch(err) {
        res.status(500).json({success: false, message: "query error: " + err, item: null})
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
        u.username AS username
        FROM items i
        LEFT JOIN price_submissions p ON i.id = p.item_id
        AND p.status='accepted'
        AND p.server_id= $1
        LEFT JOIN users u ON p.submitted_by = u.discord_id
        WHERE i.id = $2
        ORDER BY i.id, timestamp DESC;
        `

        try {
        const result = await pgPool.query(sqlQuery, [serverToGet, idToGet])
        res.status(200).json({success: true, history: result.rows})
        } catch(err) {
            res.status(500).json({success: false, message: `querry error: ${err}`, history: null})
        }
    })

    app.get('/api/itemrecom/:serverid/:itemid', async (req, res) => {
        res.status(500).json({success: false, message: "This endpoint is not available."})
    })

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

    app.post('/api/recommend', async (req, res) => {
        const input = req.body
        if (req.session.user.role == 'staff' || req.session.user.role == 'admin') {
            const sqlQuery = `
            INSERT INTO price_submissions (item_id, server_id, submitted_by, price, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `
            const values = [req.body.item_id, req.body.server_id, req.session.user.id, req.body.price, 'pending']

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

app.listen(5000, () => {
    console.log(`BCpricer running at port 5000`);
});