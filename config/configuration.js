module.exports = {
  CLOUDINARY_CLOUD_NAME: 'tommatong',
  CLOUDINARY_API_KEY: 981872811844759,
  CLOUDINARY_API_SECRET: 'jZnzi44vwAngpWo4_rZjFkftHmU',
  globalVariables: (req, res, next) => {
    res.locals.success_messages = req.flash('success-message');
    res.locals.error_messages = req.flash('error-message');
    res.locals.messages = require('express-messages')(req, res);
    res.locals.isAuthenticated = req.user ? true : false;
    res.locals.currentUser = req.user ? true : false;
    res.locals.user = req.user || null;
    res.locals.session = req.session; //making the session available in the view
    next();
  }
};

   