const express = require("express")
const app = express()
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(cookieParser())

const path = require("path")

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Minecraft Price API is running on port ${PORT}`);
});