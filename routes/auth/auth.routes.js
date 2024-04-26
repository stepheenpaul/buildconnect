const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { User } = require("../../models/user");
const LocalStrategy = require("passport-local").Strategy;

// @hapijs/joi schema validation
const userSchema = Joi.object({
  userType: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.string(),
});

router.get('/', async (req, res) => {
  if (res.user) {
    return res.redirect('pages/dashboard', { title: '.:: User Dashboard'});

  }else{
    res.render("pages/login", {
      title: ".:: Login",
    });
  }
});

router.get('/dashboard', async (req, res) => {
  // if (res.user) {
    return res.render('pages/dashboard', { title: '.:: User Dashboard'});

  // }else{
  //   return res.redirect("/login");
  // }
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
  if (res.user) {
    return res.redirect("/yee");
  }else{
    res.render("pages/login", {
      title: ".:: Login",
    });
  }
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

router.get("/logout", (req, res, next) => {
  req.logOut();
  req.flash("success-message", "Logout was successful");
  res.redirect("/login");
});

module.exports = router;