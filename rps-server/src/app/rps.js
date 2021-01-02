var rooms = [];

function doesRoomExists(roomName) {
  let roomExists = rooms.find((room) => {
    return room.name === roomName;
  });
  return roomExists;
}

var getRoom = (roomName) => {
  let roomToReturn = rooms.filter((room) => room.name === roomName);
  if (roomToReturn.length === 1) {
    return roomToReturn[0];
  } else {
    return null;
  }
};

var createRoom = (roomName) => {
  if (roomName && !doesRoomExists(roomName)) {
    let newRoom = {
      name: roomName,
      size: 0,
    };
    rooms.push(newRoom);
    return true;
  } else {
    return false;
  }
};

var joinRoom = (socket, roomName) => {
  let roomJoined = false;
  rooms.forEach((room) => {
    if (room.name === roomName && room.size < 2) {
      socket.join(roomName);
      room.size += 1;
      roomJoined = true;
    }
  });
  return roomJoined;
};

var startGame = (socket, roomName) => {
  socket.to(roomName).emit("start-game");
  socket.emit("start-game");
};

var leaveRooms = (socket) => {
  let roomsToLeave = Object.keys(socket.rooms);

  roomsToLeave.forEach((room) => {
    socket.to(room).emit("opponent-left");
    let roomIndex = rooms.findIndex((r) => r.name === room);
    rooms.splice(roomIndex, 1);
  });
};
module.exports = {
  rooms,
  createRoom,
  joinRoom,
  getRoom,
  startGame,
  leaveRooms,
};
