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

    // set default username
    socket.username = "Anonymous"

    // listen for username change
    socket.on("change_username", data => {
        socket.username = data.username
    })

    // listen for new message
    socket.on("new_message", data => {
        io.sockets.emit("new_message", {username: socket.username, message: data.message})
    })

    // listen for start typing
    socket.on("start_typing", () => {
        socket.broadcast.emit("start_typing", {username: socket.username})
    })

    // listen for stop typing
    socket.on("stop_typing", () => {
        socket.broadcast.emit("stop_typing")
    })
})
