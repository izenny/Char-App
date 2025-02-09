const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  room: { type: String, required: true },
  roomname: { type: String },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String },
      image: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
