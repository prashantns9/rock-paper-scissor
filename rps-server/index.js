// imports
var express = require("express");
var socket = require("socket.io");
var rps = require("./app/rps");
const path = require("path");

//init app
var app = express();

//start server
var server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on " + server.address().port);
});

//init socket
var io = socket(server);

app.use(express.static(__dirname + "/app/rps-client"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/app/rps-client/index.html"));
});

io.on("connection", (socket) => {
  socket.on("create-room", (name) => {
    let roomCreated = rps.createRoom(name);
    if (roomCreated) {
      socket.emit("notification", name + " was created");
      socket.emit("room-created", name);
    } else {
      socket.emit("notification", "Room already exists.");
    }
  });

  socket.on("join-room", (name) => {
    let roomJoined = rps.joinRoom(socket, name);
    if (roomJoined) {
      socket.emit("notification", name + " was joined");
      socket.emit("room-joined", name);
    } else {
      socket.emit("notification", "Room does not exists.");
    }
  });

  socket.on("player-in-game", (roomName) => {
    if (roomName) {
      let room = rps.getRoom(roomName);
      if (room.size === 2) {
        rps.startGame(socket, roomName);
      }
    }
  });

  socket.on("make-a-move", (data) => {
    socket.to(data.room).emit("made-a-move", data.move);
  });

  socket.on("get-rooms", (name) => {
    socket.emit("notification", rps.rooms);
  });

  socket.on("disconnecting", () => {
    console.log("Leaving rooms");
    rps.leaveRooms(socket);
  });

  socket.on("disconnect", () => {
    console.log("Lost connection with " + socket.id);
  });
});
