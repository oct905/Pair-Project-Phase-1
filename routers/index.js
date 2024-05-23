const express = require(`express`)
const Controller = require("../controllers/controller")
const Check = require("../middleware/Check")
const user = require("./user")
const router = express.Router()

router.get(`/`, Controller.renderLandingPage)

router.get(`/login`, Check.isLoggedOut, Controller.renderLogin)
router.post(`/login`, Controller.handleLogin)

router.get(`/logout`, Controller.handleLogout)

router.get(`/course/:id`, Controller.renderDetail)

router.get(`/signup`, Check.isLoggedOut, Controller.renderSignUp)
router.post(`/signup`, Controller.handleSignUp)

router.use(`/user`, user)

module.exports = router