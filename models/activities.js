const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  user: String,
  activity: String,
  createdAt: { type: Date, default: Date.now },
  deadline: Date,
});

usersSchema.plugin(passportLocalMongoose);

const Activity = mongoose.model("Activity", activitySchema);
