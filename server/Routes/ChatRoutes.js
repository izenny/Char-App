const { NewChat, chatUserRooms } = require("../Controllers/ChatController");
const { AuthCheck } = require("../Middlewares/authMiddleware");

const router = require("express").Router();

// router.get("/users",AuthCheck,)
// router.get("/:id",AuthCheck,getMessages)
router.post("/newchat/:id", AuthCheck, NewChat);
router.get("/rooms", AuthCheck, chatUserRooms);

module.exports = router;
