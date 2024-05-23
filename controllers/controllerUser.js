const { Course, UserCourse, User, LearningMaterial } = require(`../models`)
module.exports = class ControllerUser{
    static async renderProfile(req,res){
        try {
            console.log(req.session.user);
            let user = req.session.user
            res.render(`profile`, {user})
        } catch (error) {
            res.send(error)
        }
    }
    
    static async updateProfile(req, res){
        try {
            res.redirect(`/user/:username/profile`)
        } catch (error) {
            res.send(error)
        }
    }
    
    static async handleEnroll(req, res){
        try {
            let {id} = req.params
            console.log(`ok`);
            res.redirect(`/course/${id}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async renderRenderLearn(req, res){
        try {
            // console.log(req.params); ====================
            let {idmat} = req.params
            let data = await LearningMaterial.findByPk(idmat)
            // console.log(data); =================
            res.render(`learningMaterial`, {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async handleComplete(req, res){
        try {
            res.redirect(`/`)
        } catch (error) {
            res.send(error)
        }
    }
}