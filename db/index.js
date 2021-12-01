const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URL, options).then(() => {
  console.log("DB is ready to use");
}),
  (err) => {
    console.log(err);
};