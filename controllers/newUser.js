const flash = require('connect-flash')

module.exports = (req, res)=> {
    res.render('register', {
        // errors: req.session.registrationErrors
        errors: req.flash('validationErrors')
    })
}