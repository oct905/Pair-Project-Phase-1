const bcryptjs = require('bcryptjs')
const { Course, UserCourse, User, LearningMaterial } = require(`../models`)
module.exports = class Controller {
    static async renderLandingPage(req, res) {
        try {
            if (req.session.user) {
                console.log(`login`);
            }else{
                console.log(`logout`);
            }

            let course = await Course.findAll({
                include: UserCourse
            })

            let user = req.session.user
            // console.log(user); ============================
            res.render('home', { course , user})
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
            console.log(req.body);
            await User.create({
                userName, email, password
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
            console.log(req.session.user);
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
            // res.send(course)
            res.render(`detailCourse`, { course })
        } catch (error) {
            res.send(error)
        }
    }
}