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
    "I-INCLUDED-INFO": "id;CrateID;TagPrimary;TagSecondary;TagTertiary;TagQuaternary;TagQuinary;TagSenary;TagSeptenary;WinPercentage;RarityHuman;ItemName;ItemHTML;ConnectedItems;ItemHuman",
        }
    })
    const result = await response.json()
    const final = result.data

    console.log("Fetched, sending payload...")

    const sqlQuery = `
    INSERT INTO items (
        id, crate_id, item_name, item_html, rarity_human, win_chance, tags, updated_at, item_human
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
            obj->>'ItemHuman' AS item_human
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
        item_human = EXCLUDED.item_human;
`;

        await pgPool.query(sqlQuery, [JSON.stringify(final)])

        console.log("SUCCESS: Database updated")
    } catch(error) {
        console.error("FAILED: " + error)
    } finally {
        console.log("Function complete")
    }
}

async function getTags() {
    try {
        const fetchURL = "https://www.blossom.atn.gg/api/tags"
        const response = await fetch(fetchURL)
        const result = await response.json()
        result.push('spawner', 'currency')
        return result
    } catch(e) {
        console.log(`ERROR: tag fetch failed: ${e}`)
    }
}

const isProduction = process.env.IS_DEV === 'production'

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
        secure: isProduction,
        httpOnly: true,                   // Protects cookie against malicious frontend scripts
        sameSite: isProduction ? 'none' : 'lax'                   // Essential for cross-site cookie security
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
            console.log(`Saved session for ${minecraftUsername}`);
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
    AND p.server_id = ${req.query.selectedServer}
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
            p.is_range AS is_range,
            p.max_price AS max_price,
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
    const result = await pgPool.query(sqlQuery, [serverToGet, idToGet])
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
        if (req.session.user.role == 'staff' || req.session.user.role == 'admin') {
            if (!req.body.item_id || !req.body.server_id || !req.session.user.id || !req.body.price || (req.body.is_range && !req.body.max_price)) return res.status(400).json("Missing, mismatched, or invalid params")
            const sqlQuery = req.body.is_range ? `
            INSERT INTO price_submissions (item_id, server_id, submitted_by, price, status, is_range, max_price)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            ` : `
            INSERT INTO price_submissions (item_id, server_id, submitted_by, price, status, is_range)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `
             if (req.body.is_range && req.body.price == req.body.max_price) return res.status(400).json({success: false, message: "min and max prices must be different"})
            if (req.body.is_range && req.body.price > req.body.max_price) {
                [req.body.price, req.body.max_price] = [req.body.max_price, req.body.price]
            }

            const values = [req.body.item_id, req.body.server_id, req.session.user.id, req.body.price, 'pending']
            if (req.body.is_range) {
                values.push(true, req.body.max_price)
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

    app.get('/api/listrecoms', async (req, res) => {
        if (req.session.user.role == 'staff' || req.session.user.role == 'admin') {
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
            ORDER BY timestamp DESC;
            `
            const data = [req.session.user.id]

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

    app.get('/api/adminpanel/recoms', async (req, res) => {
        if (req.session.user.role == 'admin') {
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
            ORDER BY timestamp DESC;
            `

            try {
                const result = await pgPool.query(sqlQuery)
                res.status(200).json({success: true, history: result.rows})
            } catch(err) {
                res.status(500).json({success: false, message: `ERROR: ${err}`, history: null})
            }
        } else {
            res.status(403).json({success: false, message: "Role required: admin"})
        }
    })

    app.post('/api/adminpanel/updatestatus', async (req, res) => {
        if (req.session.user.role == 'admin') {
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
        console.log(req.query)
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
            ${server ? `AND p.server_id = ${Number(server)}` : ""}
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
            END, id ASC;
        `

        try {
            const result = await pgPool.query(sqlQuery, [input])
            res.status(200).json({success: true, result: result.rows})
        } catch(err) {
            res.status(500).json({success: false, message: `Server ERR: ${err}`, result: null})
        }
    })

    app.get('/api/cratelist', async (req, res) => {
        const sqlQuery = `
        SELECT id, "CrateName"
        FROM crates
        ORDER BY id ASC
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
    id ASC;
` : `
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
${serverCondition}
WHERE i.id = i.id${crateCondition}${tagCondition}
ORDER BY i.id ASC
`;

        try {
            const result = await pgPool.query(sqlQuery, values);
            res.status(200).json({success: true, result: result.rows})
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
        LIMIT 5;    
        `
        const values = [server]
        try {
            const result = await pgPool.query(sqlQuery, values)
            res.status(200).json({success: true, result: result.rows})
        } catch(e) {
            res.status(500).json({success: false, result: null})
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
app.listen(5000, async () => {
    console.log("Fetching tags...")
    tags = await getTags()
    console.log(`BCpricer running at port 5000`);
});