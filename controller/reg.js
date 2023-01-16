const User = require("../models/users.js");
const passport = require("passport");

register = (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log(name, email, password);

  User.register({ username: name }, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/login_signup");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  });
};

login = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  });
};

logout = (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("/");
      console.log("Logged out");
    } else console.log(err);
  });
};

module.exports = {
  register,
  login,
  logout,
};
