const mongoose = require("mongoose");


const user = new mongoose.Schema({
  userName: { type: String, required: true},
  email: { type: String, required: true, unique: true,trim: true, lowercase: true,},
  password: { type: String, required: true , minlength: 8, trim: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  isDel: { type: Boolean, default: false },
  avatar: {
    type: String,
    default:
      "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png",
  },
  resetLink: { type: String, default: "" },

});



module.exports = mongoose.model("User", user);
