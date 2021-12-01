const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
  isDel: { type: Boolean, default: false },
  avatar: {
    type: String,
    default:
      "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png",
  },
});

module.exports = mongoose.model("User", user);
