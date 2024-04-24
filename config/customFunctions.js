module.exports = {

  isUserAuthenticated: (req, res, next) => {  
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('error-message', 'Your need signin to continue');
      res.redirect('/auth/signin');
    }
  },

  accountSuspended: async (req, res, next) => {
    if(req.user.status === 'suspended') {
      req.user.onlineStatus = 'unavailable';
      await user.save();

      req.logOut();
      req.flash("success-message", "Your account has been suspended");
      res.redirect("/auth/signin");
    }else{
      next();
    }
  },  

  homeAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/auth/signin');
    }
  },
  
  alreadyLoggedIn: (req, res, next) => {
    // console.log("papapapap", req.user.isAdmin)
    if (req.user.isSuperAdmin) {
      next();
    } else {
    console.log("lalalalaal", req.user.isAdmin)

      req.flash('error-message', 'You are not permitted to view this page')
      res.redirect('back');
    }
  },

  isAdmin: (req, res, next) => {
    // console.log("IIIIIIIIIIIIIIIIIIIIIIIII ", req.user.isAdmin)
    if (req.user.role === 'admin') {
      next();
    } else {
      req.flash('error-message', 'You are not permitted to continue')
      res.redirect('/');
    }
  }
}; 