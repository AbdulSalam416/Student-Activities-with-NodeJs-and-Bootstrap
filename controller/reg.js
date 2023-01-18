const User = require("../models/users.js");
const Activity = require("../models/activities.js");
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

addItem = (req, res) => {
  if (req.user) {
    const userId = req.user._id;
    //rest of the logic
    const activity = new Activity({
      title: req.body.activityTitle,
      type: req.body.activityType,
      description: req.body.activityDescription,
      dueDate: req.body.deadlineDate,
      user: userId,
    });
    activity.save();
    res.redirect("/" + req.body.activityType);
  } else {
    res.send("Not AUthenticated");
    // redirect or throw an error
  }
};

viewActivities = (req, res) => {
  type = "activity";
  if (req.user) {
    const userId = req.user._id;
    Activity.find({ user: userId, type: type })
      .populate("user")
      .exec((err, activities) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.render("tasks", { title: "Activities", activities: activities });
        }
      });
  } else {
    res.send("Not Authenticated");
  }
};

viewProjects = (req, res) => {
  type = "project";
  if (req.user) {
    const userId = req.user._id;
    Activity.find({ user: userId, type: type })
      .populate("user")
      .exec((err, activities) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.render("tasks", { title: "Projects", activities: activities });
        }
      });
  } else {
    res.send("Not Authenticated");
  }
};

viewDeadlines = (req, res) => {
  if (req.user) {
    const userId = req.user._id;
    Activity.find({ user: userId }).exec((err, activities) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var dueDates = [];
        for (let i = 0; i < activities.length; i++) {
          dueDates.push(activities[i].dueDate);
        }
        res.render("deadlines", { dueDates: dueDates });
      }
    });
  } else {
    res.send("Please Login to see");
  }
};

module.exports = {
  viewDeadlines,
  viewProjects,
  viewActivities,
  addItem,
  register,
  login,
  logout,
};
