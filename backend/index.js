const express = require("express")
const app = express()
const path = require("path")

const axios = require("axios")
require('dotenv').config()

const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const { Pool } = require("pg")

app.set('trust proxy', 1);

const frontendHost = "https://improved-space-carnival-974vgqrjrwxr2pw7v-8081.app.github.dev/"

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended for Supabase production connections to avoid drops
  ssl: { rejectUnauthorized: false } 
});

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

        if (!roles.includes("822640342335356980")) return res.redirect(frontendHost + "frontend/?linkPopup=1")

        await pgPool.query(
            `INSERT INTO users (discord_id, username) 
             VALUES ($1, $2) 
             ON CONFLICT (discord_id) 
             DO UPDATE SET username = EXCLUDED.username, updated_at = CURRENT_TIMESTAMP`,
            [discordId, minecraftUsername]
        );

        req.session.user = {
            id: discordId,
            username: minecraftUsername,
            role: 'player' // You can customize roles or query from DB later
        };

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Error saving session.');
            }
            console.log(`Saved session for ${minecraftUsername} to Supabase!`);
        })

        console.log(`Verified user: ${minecraftUsername} (${discordId})`);
        
        res.redirect(frontendHost + "frontend/")
} catch(error) {
    if (checkA) {
        res.redirect(frontendHost + "frontend/?linkPopup=2")
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
        res.json({
            loggedIn: true,
            user: res.session.user.username,
            role: res.session.user.role
        })
    } else {
        res.status(401).json({loggedIn: false, message: "Improper or nonexistent authentication"})
    }
})

app.listen(5000, () => {
    console.log(`BCpricer running at port 5000`);
});