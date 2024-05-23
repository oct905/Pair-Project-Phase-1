const express = require(`express`)
const Check = require("../middleware/Check")
const ControllerAdmin = require("../controllers/controllerAdmin")
const admin = express.Router()

admin.get(`/usercourse`, Check.isLoggedIn, Check.isAdmin, ControllerAdmin.renderUserCourse)
admin.get(`/course/:id/learn/:idmat`, Check.isLoggedIn, Check.isAdmin, Check.isEnrolled, ControllerAdmin.renderLearn)

module.exports = admin
