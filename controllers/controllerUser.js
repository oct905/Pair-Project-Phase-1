
class ControllerUser{
    static async renderProfile(req,res){
        try {
            res.render(`profile`)
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
            res.redirect('/course/id')
        } catch (error) {
            res.send(error)
        }
    }

    static async renderRenderLearn(req, res){
        try {
            res.render(`learningMaterial`)
        } catch (error) {
            res.send(error)
        }
    }

    static async handlleComplete(req, res){
        try {
            res.redirect(`/course/id`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = ControllerUser