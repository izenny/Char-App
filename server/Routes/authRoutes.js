const { Register, Login, LogOut, CheckAuth } = require('../Controllers/AuthController')
const { AuthCheck } = require('../Middlewares/authMiddleware')

const router = require('express').Router()

router.post("/register",Register)
router.post("/login",Login)
router.post("/logout",LogOut)
router.get("/authcheck",AuthCheck,CheckAuth)

module.exports = router