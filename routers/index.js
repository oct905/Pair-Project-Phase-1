const express = require(`express`)
const Controller = require("../controllers/controller")
const user = require("./user")
const router = express.Router()

router.get(`/`, Controller.renderLandingPage)
router.use(`/`, user)

module.exports = router