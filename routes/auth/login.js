const express = require("express");
const router = express.Router();
const passport = require("passport");

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