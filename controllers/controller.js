
class Controller {
    static async renderLandingPage(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error)
        }
    }

    static renderSignUp(req, res){
        res.render('signUp')
    }

    static async handleSignUp(req, res){
        try {
            res.redirect(`/login`)
        } catch (error) {
            res.render(error)
        }
    }

    static renderLogin(req, res) {
        res.render(`login`)
    }

    static async renderDetail(req, res){
        try {
            res.render(`detailCourse`)
        } catch (error) {
            res.send(error)
        }
    }

    static async handleLogin(req, res) {
        try {
            res.redirect('/user/:username/profile')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller