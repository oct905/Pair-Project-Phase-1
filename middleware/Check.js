module.exports = class Check {
    static isLoggedIn(req, res, next) {
        if (!req.session.user) return res.redirect(`/login`)
        next()
    }

    static isLoggedOut(req, res, next) {
        if (req.session.user) return res.redirect(`/`)
        next()
    }

    static isAdmin(req, res, next) {
        if (req.session.user.role === `user`) return res.redirect(`/`)
        next()
    }

    static isUser(req, res, next) {
        if (req.session.user.role === `admin`) return res.redirect(`/`)
        next()
    }

    static isEnrolled(req, res, next) {
        console.log(req.session.user);
        next()
    }

}   