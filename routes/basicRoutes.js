var express = require("express");
const router = express.Router();
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users.js");
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

router.get("/activities", (req, res) => {
  res.render("tasks", { title: "Activities" });
});

router.get("/deadlines", (req, res) => {
  res.render("tasks", { title: "Dealines" });
});

router.get("/projects", (req, res) => {
  res.render("tasks", { title: "Projects" });
});

router.get("/addItem", (req, res) => {
  res.render("activity_form");
});

router.post("/addItem", (req, res) => {
  const activity = req.body.activityTitle;
  const description = req.body.activityDescription;
  const deadline = req.body.deadlineDate;
});

module.exports = router;
