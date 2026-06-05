const express = require("express")
const app = express()
const path = require("path")

const axios = require("axios")
require('dotenv').config()

const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const { Pool } = require("pg")

const cors = require('cors');

app.set('trust proxy', 1);

// 2. Configure strict, credential-safe CORS
app.use(cors({
    origin: 'https://bc-pricer.onrender.com', 
    
    credentials: true,
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

const frontendHost = "https://bc-pricer.onrender.com"

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

    console.log("Fetched json, connecting...")

    await pgPool.connect()

    console.log("Connected, sending payload...")

    const sqlQuery = `
            INSERT INTO items (
                id, crate_id, item_name, item_html, rarity_human, win_chance, tags, updated_at
            )
            SELECT 
                obj->>'id',
                obj->>'CrateID',
                obj->>'ItemName',
                obj->>'ItemHTML',
                obj->>'RarityHuman',
                COALESCE(NULLIF(obj->>'WinPercentage', ''), '0')::NUMERIC,
                -- Filters out empty strings and bundles remaining tags into a single clean array
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
                ),
                NOW()
            FROM jsonb_array_elements($1::jsonb) AS obj
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
        await pgPool.end()
        console.log("Connection closed.")
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
    res.send("hello")
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
        
        res.redirect(frontendHost)
} catch(error) {
    if (checkA) {
        res.redirect(frontendHost + "/?linkPopup=2")
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

/* app.get('/api/allitems', async (req, res) => {
    try {
    const result = await pgPool.query('SELECT * FROM items ORDER BY id ASC');
    console.log(result.rows)
    res.json(result.rows)
    } catch(error) {
        console.error("Allitems query failed: " + error)
        res.status(500).json({message: "Failed to fetch items"})
    }
}) */

    app.get('/api/forceupdate', async (req, res) => {
        if (req.session && req.session.user) {
            console.log(req.session.user.role)
            if (req.session.user.role == "admin") {
                console.log("Forced sync starting...")
                try {
                await syncItems()
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

app.listen(5000, () => {
    console.log(`BCpricer running at port 5000`);
});