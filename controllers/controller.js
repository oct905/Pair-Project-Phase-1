const bcryptjs = require('bcryptjs')
const { Course, UserCourse, User, LearningMaterial, Profile } = require(`../models`)
const { Op } = require('sequelize')
module.exports = class Controller {
    static async renderLandingPage(req, res) {
        try {
            let search = req.query.search
            let course = {}
            console.log(search);
            if (search) {
                course = await Course.findAll({
                    include: UserCourse,
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    }
                })
            } else {
                course = await Course.findAll({
                    include: UserCourse
                })
            }
            if (req.session.user) {
                console.log(`login`);

            } else {
                console.log(`logout`);
            }
            let user = req.session.user
            res.render('home', { course, user })
        } catch (error) {
            res.send(error)
        }
    }

    static renderSignUp(req, res) {
        let msg = req.query.error
        if (msg) {
            msg = msg.split(',')
        }
        res.render('signUp', { msg })
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
            if (error.name === `SequelizeValidationError`) {
                let msg = error.errors.map(el => el.message)
                console.log(msg);
                res.redirect(`/signUp?error=${msg}`)
            } else {
                res.redirect(`/signUp?error=${error}`)
            }
        }
    }

    static renderLogin(req, res) {
        let msg = req.query.error
        if (msg) {
            msg = msg.split(',')
        }
        res.render(`login`, { msg })
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

            const isValid = bcryptjs.compareSync(password, user.password)

            if (!isValid) {
                throw 'Incorrect Password'
            }

            user = JSON.parse(JSON.stringify(user))
            delete user.password
            req.session.user = user
            res.redirect('/')
        } catch (error) {
            res.redirect(`/login?error=${error}`)
        }
    }

    static handleLogout(req, res) {
        delete req.session.user
        res.redirect(`/`)
    }

    static async renderDetail(req, res) {
        try {
            let userId = req.session.user
            let user = ''
            if (userId) {
                user = await User.findByPk(userId.id, {
                    include: UserCourse
                })
            }
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
            });
            res.render(`detailCourse`, { course, user, id })
        } catch (error) {
            res.send(error)
        }
    }
}