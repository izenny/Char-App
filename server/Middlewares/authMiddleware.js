const JWT = require("jsonwebtoken");
const User = require("../Models/UserSchema");

exports.AuthCheck = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unathorized - no token is provided"})
        }
        const decoded = JWT.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unathorized - Invalid token"})
        }
        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(400).json({ message: "User not found" });
          }
          req.user = user
          next()
    } catch (error) {
        console.error("Error in authCheck:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
    }
};
