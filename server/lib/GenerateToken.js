const JWT = require("jsonwebtoken");

exports.GenerateToken = (res, userId) => {
  const token = JWT.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
  // Set the cookie
  res.cookie("token", token, {
    httpOnly: true, // This cookie cannot be accessed by client-side JavaScript
    secure: process.env.NODE_ENV === "production" ? true : false, // This cookie can only be sent over https
    sameSite: "strict", // This cookie is not sent along with any cross-site requests
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    
  });

  return token; // Make sure to return the token
};
