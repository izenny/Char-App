const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  exports.getReceiverSocketId = (userId) => {
    return userSocketMap(userId);
  };

  // use to store online users
  const userSocketMap = {};

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    const userId = socket.handshake.query.userId;
    console.log("connected users", userId);

    if (userId) userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

module.exports = initializeSocket;
