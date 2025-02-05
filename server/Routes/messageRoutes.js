const { getMessages, sendMessages } = require('../Controllers/MessageControllers')
const { AuthCheck } = require('../Middlewares/authMiddleware')

const router = require('express').Router()

// router.get("/users",AuthCheck,)
router.get("/:id",AuthCheck,getMessages)
router.post("/send/:id",AuthCheck,sendMessages)

module.exports = router