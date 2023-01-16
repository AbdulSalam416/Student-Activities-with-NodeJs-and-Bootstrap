~require("dotenv").config();
var express = require("express");
const ejs = require("ejs");
const basicRoutes = require("./routes/basicRoutes");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
const fbStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const strategies = require("./controller/strategies");

const User = require("./models/users.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("src"));
main().catch((err) => console.log(err));

async function main() {
  app.use(
    session({
      secret: process.env.PASSPORT_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.session());

  passport.use(passport.initialize());

  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost:27017/users_1");
  passport.use(User.createStrategy());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(strategies.FB_Strategy);
  passport.use(strategies.GG_Strategy);

  app.use(basicRoutes);
}
app.listen(3000, function () {
  console.log("Listening at port 3000...");
});
