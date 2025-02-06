// import { io } from "socket.io-client";
// import { setOnlineUsers } from "../Redux/AuthSlice";

// let socket = null;

// export const connectSocket = (userId) => {
//   if (!userId || socket) return; // Prevent multiple connections

//   socket = io("http://localhost:7000", {
//     query: { userId }, // Send user ID to the server
//     transports: ["websocket"],
//   });

//   socket.on("connect", () => {
//     console.log("✅ Connected to Socket.IO:", socket.id);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Disconnected from Socket.IO");
//   });

//   return socket;
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//     console.log("🔌 Socket Disconnected");
//   }
// };

// export const getSocket = () => socket; // For accessing socket anywhere


import { io } from "socket.io-client";
import { setOnlineUsers } from "../Redux/AuthSlice";
import { setMessages } from "../Redux/ChatSlice";

let socket = null;

export const connectSocket = (userId, dispatch) => {
  if (!userId || socket) return;

  socket = io("http://localhost:7000", {
    query: { userId },
    transports: ["websocket"],
  });

  socket.on("connect", () => console.log("✅ Connected to Socket.IO:", socket.id));

  socket.on("disconnect", () => console.log("❌ Disconnected from Socket.IO"));

  // Handle online users inside the service itself
  socket.on("getOnlineUsers", (users) => {
    dispatch(setOnlineUsers(users)); // Only one place to update Redux
  });

  socket.on("newMessage",(newMessage)=>{
    dispatch(setMessages(newMessage))
  })

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket Disconnected");
  }
};

export const getSocket = () => socket;
