const express = require("express")
const path = require("path")

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{ cors: { origin: "*"}})
let players= [];


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

    if(!players.includes(socket.id)){

    console.log("NP");
        // send a message to the client
    socket.send(JSON.stringify({
        type: "new_player",
        content: {"id":socket.id,"players":players}
    }));
    socket.broadcast.emit('message', (JSON.stringify({
        type: "joined",
        content: {"id":socket.id}
    })))
    players.push(socket.id);
        

    }

    socket.on('disconnect', () => {
        console.log(socket.id+'user disconnected');
      });


    socket.on('message', (data) => {
        
        var data = JSON.parse(data);
        data.content = socket.id+","+data.content;
        console.log(data);
        socket.broadcast.emit('message', JSON.stringify(data))
    })
})