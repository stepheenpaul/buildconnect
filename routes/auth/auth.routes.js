const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { User } = require("../../models/user");
const LocalStrategy = require("passport-local").Strategy;

// ===============================================================================================
// Defining Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, async (req, email, password, done) => {
  let findUser = await User.findOne({ email }).populate(' plg');
     
  if (!findUser) {
    return done(null, false, req.flash('error-message', 'User not found, Please check email'));
  }

  await bcrypt.compare(password, findUser.password, async (err, passwordMatched) => {
    if (err) {
      return err;
    } 
   
    if (!passwordMatched) { 
      return done(null, false, req.flash('error-message', 'Wrong password'));
    }
    
    // if(!findUser.verified) {
    //   return done(null, false, req.flash('error-message', 'You need to verify your email. Please check your mail.'));
    // }
    // else if(!findUser.verified) {
    //   return done(null, false, req.flash('error-message', 'Your account has not been approved.'));
    // }
    // else if(findUser.status == 'suspended') {
    //   return done(null, false, req.flash('error-message', 'Account suspended. Please contact admin.'));
    // }
    // else if(findUser.status == 'disapproved') {
    //   return done(null, false, req.flash('error-message', 'Account disapproved. Please contact admin.'));
    // }
 
    findUser.onlineStatus = 'available'
    await findUser.save();
    // console.log("I am here:::::: ")
    
    return done(null, findUser, req.flash('success-message', 'Login Successful'));
  });

}))

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await User.findById(id).populate({path:'activities', options:{ sort:{_id : -1} } });
  // .populate('teams').populate('plg').populate('projects').populate('connections');
  try {
    const user = await User.findById(id)
    done(null, user);
  } catch (error) {
    done(error, null);
  }

  done(err, user);
});
// ===============================================================================================

// @hapijs/joi schema validation
const userSchema = Joi.object({
  userType: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.string(),
});

router.get('/', async (req, res) => {
  res.render('pages/index', { title: 'Home page'})
});

router
  .route("/register")
  .get((req, res) => {
    res.render("pages/register", {
      title: ".:: Register",
    });
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body)
      // @hapijs/joi validating inputs
      const result = await userSchema.validateAsync(req.body);
      if (result.error) {
        console.log("error validating user");
        return req.flash("error-message", "something went wrong");
      }

      // @hapijs/joi validating useremail
      const userEmail = await User.findOne({ email: result.email });
      if (userEmail) {
        console.log("email already exist in our database");
        req.flash("error-message", "email already registered, try another");
        return res.redirect("/register");
      }

      // password validation
      if (result.password !== result.confirmPassword) {
        console.log("password not match");
        req.flash("error-message", "password not match");
        return res.redirect("/register");
      }
      // creating a new user
      const newUser = new User(result);

      // hashing the password
      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log("hashing failed");
          }
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              console.log("newUser has been saved successfully", user);
              req.flash(
                "success-message",
                "Your Registration was successful, Kindly login"
              );
              return res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } catch (error) {
      next(error);
    }
  });

// login  GET route
router.get("/login", (req, res) => {
    if (res.locals.user) {
      res.redirect("/yee");
    }
    res.render("pages/login", {
      title: ".:: Login",
    });
});
  
// login POST route
router.post("/login", (req, res, next) => {
passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
})(req, res, next);
});

module.exports = router;