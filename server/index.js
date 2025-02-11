// // const express = require("express");
// // const mongoose = require("mongoose");
// // const dotenv = require("dotenv");
// // const cookieparser = require("cookie-parser");
// // const authRoutes = require("./Routes/authRoutes");
// // const userRoutes = require("./Routes/userRoutes");
// // const messageRoutes = require("./Routes/messageRoutes");
// // const cors = require("cors");
// // dotenv.config();
// // const app = express();
// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //   })
// // );
// // app.use(express.json());
// // app.use(cookieparser());
// // app.use("/api/auth", authRoutes);
// // app.use("/api/user", userRoutes);
// // app.use("/api/messages", messageRoutes);

// // const PORT = process.env.PORT || 7001;
// // app.listen(PORT, () => {
// //   console.log(`server is running on ${PORT}`);
// // });

// // mongoose
// //   .connect(process.env.MONGODB_URL)
// //   .then(() => {
// //     console.log("Connected to MongoDB");
// //   })
// //   .catch((err) => console.log(err));

// const express = require("express");
// const http = require("http");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const authRoutes = require("./Routes/authRoutes");
// const userRoutes = require("./Routes/userRoutes");
// const messageRoutes = require("./Routes/messageRoutes");
// const initializeSocket = require("./lib/Socket"); // Import Socket.io

// dotenv.config();

// const app = express();
// const server = http.createServer(app); // Create HTTP server

// // Middleware
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/messages", messageRoutes);

// // Initialize Socket.IO
// initializeSocket(server);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("MongoDB Connection Error:", err));

// const PORT = process.env.PORT || 7001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const chatRoutes = require("./Routes/ChatRoutes");
const initializeSocket = require("./lib/Socket");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Middleware
// Client_URL
app.use(
  cors({ origin: "https://chatty-web-site.netlify.app", credentials: true })
);

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
// Initialize Socket.IO
initializeSocket(server);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 7001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
