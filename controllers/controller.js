const bcryptjs = require('bcryptjs')
const { Course, UserCourse, User, LearningMaterial, Profile } = require(`../models`)
module.exports = class Controller {
    static async renderLandingPage(req, res) {
        try {
            
            if (req.session.user) {
                console.log(`login`);

            } else {
                console.log(`logout`);
            }

            let course = await Course.findAll({
                include: UserCourse
            })

            let user = req.session.user
            res.render('home', { course, user })
        } catch (error) {
            res.send(error)
        }
    }

    static renderSignUp(req, res) {
        res.render('signUp')
    }

    static async handleSignUp(req, res) {
        try {
            let { userName, email, password } = req.body
            await User.create({
                userName, email, password
            })
            let user = await User.findAll()
            let id = user[user.length - 1].id
            await Profile.create({
                fullName: '',
                age: null,
                address: '',
                UserId: id
            })
            res.redirect(`/login`)
        } catch (error) {
            res.render(error)
        }
    }

    static renderLogin(req, res) {
        res.render(`login`)
    }

    static async handleLogin(req, res) {
        try {
            let { userName, password } = req.body

            let user = await User.findOne({
                include: UserCourse,
                where: {
                    userName
                }
            })
            if (!user) throw 'Incorrect Username'

            const isValid = bcryptjs.compare(password, user.password)

            if (!isValid) throw 'Incorrect Password'

            user = JSON.parse(JSON.stringify(user))
            delete user.password
            req.session.user = user
            res.redirect('/')
        } catch (error) {
            console.log(error);
            res.redirect(`/login?error=${error}`)
        }
    }

    static handleLogout(req, res) {
        delete req.session.user
        res.redirect(`/`)
    }

    static async renderDetail(req, res) {
        try {
            let UserId = req.session.user.id
            let user = await User.findByPk(UserId, {
                include: UserCourse
            })
            user = JSON.parse(JSON.stringify(user))
            delete req.session.user
            req.session.user = user
            let { id } = req.params
            let course = await Course.findByPk(id, {
                include: [{
                    model: UserCourse,
                    include: {
                        model: User
                    }
                },
                    LearningMaterial,
                ]
            })
            res.render(`detailCourse`, { course })
        } catch (error) {
            res.send(error)
        }
    }
}