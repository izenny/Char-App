const cloudinary = require("../lib/Cloudinary");
const User = require("../Models/UserSchema");

exports.UpdateUserProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;
    if (!profilepic) {
      return res.status(400).json({ message: "Profile Pic is Required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const user = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in profile pic update:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.json(200).json(filteredUsers)
  } catch (error) {
    console.log("Error in getting users:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
