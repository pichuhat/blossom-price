const express = require("express")
const app = express()
const path = require("path")

const axios = require("axios")
require('dotenv').config()

app.use("/static", express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {
    res.send("hello")
})

app.get('/api/auth/callback', async (req, res) => {
    const code = req.query.code; // Discord sent this to you
    
    if (!code) {
        return res.status(400).send('Missing authorization code.');
    }

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

        // 2. Ask Discord for the user's specific profile INSIDE your server
        const guildMemberResponse = await axios.get(
            `https://discord.com/api/users/@me/guilds/${process.env.MINECRAFT_GUILD_ID}/member`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // Extract their verified info
        const memberData = guildMemberResponse.data;
        const minecraftUsername = memberData.nick || memberData.user.username; 
        const discordId = memberData.user.id;

        // 3. SUCCESS! They are in your Discord server.
        console.log(`Verified user: ${minecraftUsername} (${discordId})`);
        
        // For now, print success to screen. Later, you'll issue a cookie here!
        res.send(`Welcome, ${minecraftUsername}! You are successfully authenticated.`);
})

app.listen(5000, () => {
    console.log(`✅ Minecraft Price API is running on port 5000`);
});