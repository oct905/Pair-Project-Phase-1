const express = require(`express`)
const Controller = require("../controllers/controller")
const user = require("./user")
const router = express.Router()

router.get(`/`, Controller.renderLandingPage)
router.get(`/login/`, Controller.renderLogin)
router.post(`/login/`, Controller.handleLogin)
router.get(`/course/:id`, Controller.renderDetail)
router.get(`/signup`, Controller.renderSignUp)
router.post(`/signup`, Controller.handleSignUp)
router.use(`/user/:username`, user)

module.exports = router