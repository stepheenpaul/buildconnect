const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {User} = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use("local", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, async (req, email, password, done) => { 

  try {
      let user = await User.findOne({ email });
         
      if (!user) {
        return done(null, false, req.flash('error-message', 'User not found, Please check email'));
      }
    
      await bcrypt.compare(password, user.password, async (err, passwordMatched) => {
        if (err) {
          return err;
        } 
       
        if (!passwordMatched) { 
          return done(null, false, req.flash('error-message', 'Wrong password'));
        }
        
        return done(null, user, req.flash('success-message', 'Login Successful'));
      });


  } catch (error) {
    return done(error, false);
  }
}));

//determines which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id); //in this case its the user.id
});

//use the user.id from the serializeUser to get the object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});