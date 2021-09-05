const express = require("express");
const app = express()

app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index")
})

const server = app.listen(5000, () => console.log("Server started"))

const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("New socket connection")
})
