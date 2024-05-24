const express = require(`express`)
const ControllerUser = require("../controllers/controllerUser")
const Check = require("../middleware/Check")
const user = express.Router()
const pdfService = require(`../helper/pdf-service`)

user.get(`/profile`, Check.isLoggedIn, ControllerUser.renderProfile)
user.post(`/profile`, Check.isLoggedIn, ControllerUser.updateProfile)

user.get(`/enroll/course/:id`, Check.isLoggedIn, Check.isUser, ControllerUser.handleEnroll)

user.get(`/course/:id/learn/:idmat`, Check.isLoggedIn, Check.isUser, Check.isEnrolled, ControllerUser.renderLearn)

user.get(`/course/:id/learn/:idmat/complete`, Check.isLoggedIn, Check.isUser, Check.isEnrolled, ControllerUser.handleComplete)
user.get(`/download/:id`, ControllerUser.download)
// user.get(`/download/:id`, async (req, res, next) => {
//     const stream = res.writeHead(200, {
//         'Content-Type' : 'application/pdf',
//         'content-disposition' : 'attachment;filename=materi.pdf'
//     })
//     let materi = req.session.data.materials
//     pdfService.buildPDF(
//         (chunk) => stream.write(chunk),
//         () => stream.end(),
//         materi
//     )
// })


module.exports = user