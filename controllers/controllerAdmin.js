const bcryptjs = require('bcryptjs')
const { Course, UserCourse, User, LearningMaterial, Profile } = require(`../models`)
module.exports = class ControllerAdmin{
    static async renderUserCourse(req, res){
        try {
            let data = await UserCourse.findAll()
            res.render(`userCourse`, {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async renderLearn(req, res) {
        try {
            console.log(req.params);
            let { id, idmat } = req.params
            let data = await LearningMaterial.findByPk(idmat)
            res.render(`learningMaterial`, { data, id })
        } catch (error) {
            res.send(error)
        }
    }
}