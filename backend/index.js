const express = require("express")
const app = express()
const path = require("path")

app.use("/static", express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {
    res.send("hello")
})

app.get('/api/auth/callback', (req, res) => {
    //man idk
    res.send("guh idk maybe you logged in")
})

app.listen(5000, () => {
    console.log(`✅ Minecraft Price API is running on port 5000`);
});