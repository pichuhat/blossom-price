const express = require("express")
const app = express()
const path = require("path")

app.use("/static", express.static(path.join(__dirname, "static")));


app.listen(5000, () => {
    console.log(`✅ Minecraft Price API is running on port ${PORT}`);
});