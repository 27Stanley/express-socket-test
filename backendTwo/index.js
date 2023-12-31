const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (data) => {
        console.log(`message from ${data.username}: ${data.message}`);
        io.emit('chat message', data); 
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 

// io.on('connection', (socket) => {
// socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//     });
// });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

module.exports = app