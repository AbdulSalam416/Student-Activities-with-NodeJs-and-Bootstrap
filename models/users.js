const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
});

usersSchema.plugin(passportLocalMongoose);
usersSchema.plugin(findOrCreate);

const User = mongoose.model("User", usersSchema);

module.exports = User;
