const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
  },
  role: {
    type: Number,
    default: 0, // 0=user, 1=admin
  },
});

module.exports = mongoose.model("User", userSchema);
