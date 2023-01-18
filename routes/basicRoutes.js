var express = require("express");
const router = express.Router();
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users.js");
const Activity = require("../models/activities.js");

const reg = require("../controller/reg");
passport.use(new LocalStrategy(User.authenticate()));

router.get("/login_signup", function (req, res) {
  res.render("login_signup");
});

//for /home page
router.get("/home", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("login_signup");
  }
});

router.post("/register", reg.register);

// For Posting Login

router.post("/login", reg.login);

//for /index page

router.get("/", function (request, response) {
  response.render("index");
});

//for /contact page
router.get("/contact", function (request, response) {
  response.render("contact");
});

router.get("/logout", reg.logout);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/home",
  passport.authenticate("facebook", { failureRedirect: "/login_signup" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/home",
  passport.authenticate("google", { failureRedirect: "/login_signup" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

router.get("/activity", reg.viewActivities);

router.get("/deadlines", reg.viewDeadlines);

router.get("/project", reg.viewProjects);

router.get("/addItem", (req, res) => {
  res.render("activity_form");
});

router.post("/addItem", reg.addItem);

module.exports = router;
