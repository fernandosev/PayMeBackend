const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: String, // active | created | blocked
  verificationCode: Number,
});

module.exports = mongoose.model("User", UserSchema);
