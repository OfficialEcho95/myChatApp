const http = require("http");
const express = require('express');
const app = express();
require("./config/db");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const publicPath = path.join(__dirname, "../myChatApp/socket/public");
const {generateMessage} = require('./socket/utils/message')

console.log('publicPath:', publicPath);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("A new user connected", socket.id);

  //emits message when a user is created
  socket.emit("message",
    generateMessage("Admin",
      `${socket.id} welcome to the chat group`)
  );

  //emits message when a new user joins the group
  socket.broadcast.emit("message",
    generateMessage("Admin", `${socket.id} joined the chat group`)
  );

  // socket.on('clientMessage', (message) => {
  //   console.log("Received message from client: ", message);
  // });

  //creates and broadcasts message to all users
  socket.on('message', (message) => {
    io.emit('Bmessage', generateMessage(message.from, message.text));
  });
  //message for when a user disconnects
  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });
});

app.get('/', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  console.log('indexPath:', indexPath);
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
