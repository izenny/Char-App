const cloudinary = require("../lib/Cloudinary");
const Messages = require("../Models/MessageSchema");
exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Messages.find({
      $or: [
        { senderid: myId, receiverid: userToChatId },
        { senderid: userToChatId, receiverid: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in fetch mmessages:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverid } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Messages({
      senderid: senderId,
      receiverid: receiverid,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    //socket io here

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in send message:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
