const { where } = require("sequelize")
const { Course, UserCourse, User, LearningMaterial, Profile } = require(`../models`)
module.exports = class ControllerUser {
    static async renderProfile(req, res) {
        try {
            let id = req.session.user.id
            let profile = await Profile.findOne({
                where: {
                    UserId: id
                }
            })
            res.render(`profile`, { profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async updateProfile(req, res) {
        try {
            let id = req.session.user.id
            let { fullName, age, address } = req.body
            await Profile.update({
                fullName, age, address
            }, {
                where: {
                    UserId: id
                }
            })
            res.redirect(`/user/profile`)
        } catch (error) {
            res.send(error)
        }
    }

    static async handleEnroll(req, res) {
        try {

            let CourseId = req.params.id
            let enrollDate = new Date()
            
            let UserId = req.session.user.id
            let user = await User.findByPk(UserId, {
                include: UserCourse
            })
            user = JSON.parse(JSON.stringify(user))
            delete req.session.user
            req.session.user = user
            await UserCourse.create({
                UserId, CourseId, enrollDate
            })
            res.redirect(`/course/${CourseId}`)
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

    static async handleComplete(req, res) {
        try {
            let {id, idmat} = req.params
            let data = req.session.user.UserCourses
            console.log(`\n`, `=============`,data);
            let userCourseId = 0
            id = Number(id)
            data.forEach(element => {
                console.log(id, element);
                if(id === element.CourseId){
                    userCourseId = element.id
                }
            });
            console.log(userCourseId);
            let completedDate = new Date()
            await UserCourse.update({completedDate},{
                where:{
                    id : userCourseId
                }
            })
            console.log(`================`);
            res.redirect(`/course/${id}`)
        } catch (error) {
            res.send(error)
        }
    }
}