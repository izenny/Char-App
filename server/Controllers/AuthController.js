const { GenerateToken } = require("../lib/GenerateToken");
const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
exports.Register = async (req, res) => {
  console.log("called");
  
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    GenerateToken(res, newUser._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.fullname,
        ProfilePic: newUser.profilepic,
      },
    });
  } catch (error) {
    console.error("Error in SignUp:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    GenerateToken(res, user._id);
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.fullname,
        ProfilePic: user.profilepic,
      },
    });
  } catch (error) {
    console.error("Error in Login:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// exports.LogOut = async (req, res) => {
//   try {
//     console.log("called");
    
//     res.clearCookie("token");
//     res.status(200).json({ success: true, message: "Logout successfully" });
//   } catch (error) {
//     console.log("Error in Logout:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
exports.LogOut = async (req, res) => {
  try {
    console.log("Logout called");

    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // ✅ Required for cross-origin cookies
      sameSite: "None",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("Error in Logout:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.CheckAuth = async (req, res) => {
  // console.log("called");

  try {
    // res.status(200).json(req.user)
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: req.user._id,
        email: req.user.email,
        username: req.user.fullname,
        ProfilePic: req.user.profilepic,
      },
    });
  } catch (error) {
    console.log("Error in check auth:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
