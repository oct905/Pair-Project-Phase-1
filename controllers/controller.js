
class Controller {
    static async renderLandingPage(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }

    static renderLogin(req, res) {
        res.render(`login`)
    }

    static async handleLogin(req, res) {
        try {
            res.redirect('/profile')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller