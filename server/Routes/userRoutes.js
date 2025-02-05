const { UpdateUserProfile, getUsers } = require("../Controllers/UserController");
const { AuthCheck } = require("../Middlewares/authMiddleware");

const router = require("express").Router();

router.put("/update_profile", AuthCheck, UpdateUserProfile);

router.get("/users", AuthCheck,getUsers);

module.exports = router;
