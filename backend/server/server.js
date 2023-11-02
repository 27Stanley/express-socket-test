const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const path = require("path")


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "../public")))

io.on("connection", (socket) => {
    socket.emit('greeting-from-server', {
        greeting: 'Hello Client'
    });
      socket.on('greeting-from-client', function(message) {
        console.log(message);
    });
});


module.exports = app