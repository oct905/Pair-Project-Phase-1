const express = require(`express`)
const Check = require("../middleware/Check")
const ControllerAdmin = require("../controllers/controllerAdmin")
const admin = express.Router()

admin.get(`/delete/:id`, ControllerAdmin.deleteUser)
admin.get(`/usercourse`, Check.isLoggedIn, Check.isAdmin, ControllerAdmin.renderUserCourse)
admin.get(`/course/:id/learn/:idmat`, Check.isLoggedIn, Check.isAdmin, Check.isEnrolled, ControllerAdmin.renderLearn)
admin.get(`/download/:id`, ControllerAdmin)

module.exports = admin
