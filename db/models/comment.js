const mongoose = require("mongoose");

const coment = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    isDel: { type: Boolean, default: false },
    timeComment: { type: Date, default: Date.now },
  },
);

module.exports = mongoose.model("Comment", coment);
