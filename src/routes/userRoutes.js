const express = require("express")
const { registration, login, profileUpdate } = require("../controller/userController")
const authentication = require("../../middleware/authentication")
const router = express.Router()


router.post("/registration",registration)
router.post("/login",login)
router.post("/profileUpdate/:id",authentication,profileUpdate)



module.exports = router