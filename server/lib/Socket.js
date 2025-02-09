const { Server } = require("socket.io");
const { joinRoom, sendMessage } = require("../Controllers/ChatController");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // Use to store online users
  const userSocketMap = {};

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    const userId = socket.handshake.query.userId;
    console.log("Connected users:", userId);

    // Track online users
    if (userId) userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Join room
    socket.on("join room", (room) => {
      console.log("Joined room:", room);
      joinRoom(socket, room);
    });

    // Handle sending messages
    socket.on("chatMessage", (data) => {
      sendMessage(io, socket, data, userSocketMap);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

module.exports = initializeSocket;
