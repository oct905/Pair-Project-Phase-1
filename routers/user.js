const express = require(`express`)
const ControllerUser = require("../controllers/controllerUser")
const user = express.Router()

user.get(`/profile`, ControllerUser.renderProfile)
user.post(`/profile`, ControllerUser.updateProfile)
user.get(`/enroll`, ControllerUser.handleEnroll)
user.get(`/course/id/learn`, ControllerUser.renderRenderLearn)
user.get(`/course/id/learn/complete`, ControllerUser.handlleComplete)


module.exports = user