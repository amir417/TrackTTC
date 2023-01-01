const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    bus: {type: Array, default: null},
  },
  {
    collection: "TTCInfo",
  }
);

const User = mongoose.model("UserDetail", UserDetailsScehma);

module.exports = User;