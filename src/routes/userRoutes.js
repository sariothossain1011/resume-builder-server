const express = require("express")
const { registration, login, profileUpdate, getProfile } = require("../controller/userController")
const authentication = require("../middleware/authentication")
const router = express.Router()


router.post("/registration",registration)
router.post("/login",login)
router.post("/profileUpdate/:id",authentication,profileUpdate)
router.get("/getProfile/:id",authentication,getProfile)


module.exports = router