const Chat = require("../Models/ChatSchema");
const { v4: uuidv4 } = require("uuid");
const User = require("../Models/UserSchema");

// Send a message in the chat room
exports.NewChat = async (req, res) => {
  const { id: receiverId } = req.params;
  const { roomname } = req.body;
  const senderId = req.user._id;

  // Prevent self-chat
  if (senderId.toString() === receiverId) {
    return res
      .status(400)
      .json({ success: false, message: "Cannot chat with yourself" });
  }

  try {
    // Check if chat already exists between participants
    let chat = await Chat.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate("participants", "fullname profilepic email"); // Populate user details

    if (!chat) {
      const roomId = uuidv4();
      chat = new Chat({
        roomname,
        room: roomId,
        participants: [receiverId, senderId],
        messages: [],
      });
      await chat.save();
      chat = await chat.populate("participants", "fullname profilepic email");
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error creating new chat:", error);
    res.status(500).json({ success: false, message: "Failed to create chat" });
  }
};

exports.sendMessage = async (io, socket, data, userSocketMap) => {
  try {
    const { room, senderId, text, image } = data;

    if (!senderId) {
      return socket.emit("error", { message: "Sender ID is required" });
    }

    console.log(`Sender: ${senderId}, Room: ${room}`);

    // Find the chat room
    const chat = await Chat.findOne({ room });

    if (!chat) {
      console.warn(`Chat not found for room: ${room}`);
      return socket.emit("error", { message: "Chat room not found" });
    }

    
    const newMessage = { sender: senderId, text, image };

    // Add message to chat
    chat.messages.push(newMessage);

    try {
      await chat.save();
    } catch (saveError) {
      console.error("Error saving message:", saveError);
      return socket.emit("error", { message: "Failed to save message" });
    }

    // Emit the message to all users in the room
    io.to(room).emit("chatMessage", { ...newMessage, room });

    // Find recipient
    const recipientId = chat.participants.find((id) => id !== senderId);

    // Notify the recipient only if they are online
    // Notify the recipient only if they are online
    if (recipientId && userSocketMap[recipientId]) {
      const recipientSocket = userSocketMap[recipientId];
      io.to(recipientSocket).emit("newMessageNotification", {
        senderId,
        text,
        room,
      });
    }
  } catch (error) {
    console.error("Error sending message:", error);
    socket.emit("error", { message: "Failed to send message" });
  }
};

// exports.sendMessage = async (io, socket, data) => {
//   try {
//     const { room, senderId, text, image } = data;
//     console.log(senderId, room);

//     // todo :consition if not senderid

//     // Find the chat room
//     const chat = await Chat.findOne({ room });

//     if (!chat) {
//       console.log("Chat not found for room:", room);
//       return;
//     }

//     // Create the message object
//     const newMessage = {
//       sender: senderId,
//       text,
//       image,
//     };

//     // Add message to chat
//     chat.messages.push(newMessage);
//     await chat.save();

//     io.to(room).emit("chatMessage", { ...newMessage, room: chat.room });

//     // Notify users to refresh their chat list
//     // io.to()
//   } catch (error) {
//     console.error("Error sending message:", error);
//     socket.emit("error", { message: "Failed to send message" });
//   }
// };

// Join a chat room
exports.joinRoom = async (socket, room) => {
  try {
    socket.join(room);
    const chat = await Chat.findOne({ room });
    if (!chat) {
      console.log("Chat not found for room:", room);
      socket.emit("oldMessage", []); // Send empty array if no chat is found
      return;
    }
    const messages = chat.messages;
    socket.emit("oldMessage", messages);
  } catch (error) {
    console.error("Error joining room:", error);
    socket.emit("error", { message: "Failed to join room" });
  }
};



exports.chatUserRooms = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch rooms where user is a participant
      const rooms = await Chat.find({ participants: userId })
        .populate({
          path: "participants",
          select: "fullname profilepic",
        })
        .lean(); // Convert to a plain object to allow manipulation
  
      // Manually sort and keep only the last message
      const updatedRooms = rooms.map((room) => {
        const sortedMessages = room.messages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        return {
          ...room,
          messages: sortedMessages.slice(0, 1), // Keep only the latest message
        };
      });
  
      res.status(200).json(updatedRooms);
    } catch (error) {
      console.error("Error fetching user rooms:", error);
      res.status(500).json({ message: "Failed to fetch user rooms" });
    }
  };
  