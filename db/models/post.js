const mongoose = require("mongoose");

const post = new mongoose.Schema({
  img: { type: String },
  dec: { type: String, required: true },
  users: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  isDel: { type: Boolean, default: false },
  // likes: { type: mongoose.Schema.Types.ObjectId ,vref: "Like"},
  timePost: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", post);
