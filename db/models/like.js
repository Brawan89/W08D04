const mongoose = require("mongoose");

const like = new mongoose.Schema({
  like: { type: Boolean, default: false },
  users: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  posts: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
});

module.exports = mongoose.model("Like", like);
