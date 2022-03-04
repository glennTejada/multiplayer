const express = require("express")
const path = require("path")

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{ cors: { origin: "*"}})

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("demo")
})

server.listen(8000, () => {
    console.log("Server Running on PORT 8000")
})

io.on('connection', (socket) => {
    console.log("User Id: "+socket.id)

    socket.on('message', (data) => {
        socket.broadcast.emit('message', (data))
    })
})