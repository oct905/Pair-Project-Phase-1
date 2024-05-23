const express = require(`express`)
const ControllerUser = require("../controllers/controllerUser")
const Check = require("../middleware/Check")
const user = express.Router()

user.get(`/profile`, Check.isLoggedIn, ControllerUser.renderProfile)
user.post(`/profile`, Check.isLoggedIn, ControllerUser.updateProfile)

user.get(`/enroll/course/:id`, Check.isLoggedIn, Check.isUser, ControllerUser.handleEnroll)

user.get(`/course/:id/learn/:idmat`, Check.isLoggedIn, Check.isUser, ControllerUser.renderRenderLearn)

user.get(`/course/:id/learn/:idmat/complete`, ControllerUser.handleComplete)


module.exports = user