module.exports = {
    isUserLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            req.flash('error-message', 'You have to login first')
            res.redirect('/login')
        }
    },

    isUserAdmin: function (req, res, next) {
        if (req.isAuthenticated() && req.user.userType == 'admin') {
            return next()
        } else {
            req.flash('error-message', 'You are not permitted to carry out this action')
            res.redirect('back')
        }
    },
}