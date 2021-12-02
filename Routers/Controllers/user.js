const userModel = require("./../../db/models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

//create users
const register = async (req, res) => {
  const { userName, email, password, isDel, avatar, role } = req.body;

  // email -> lowerCase
  const saveEmail = email.toLowerCase();
  //encryption password
  const savedPass = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    userName,
    email: saveEmail,
    password: savedPass,
    isDel,
    avatar,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//login
const login = (req, res) => {
  const { userName, email, password } = req.body;

  // const saveEmail = email.toLowerCase();

  userModel
    //email or userName...
    // { $or: [ { <expression1> }, { <expression2> } ] }
    .findOne({ $or: [{ email }, { userName }] })
    .then(async (result) => {
      if (result) {
        if (result.email == email || result.userName == userName) {
          const hashedPass = await bcrypt.compare(password, result.password);
          console.log(hashedPass);

          if (hashedPass) {
            const payload = {
              id: result.id,
              userName: result.userName,
              email: result.email,
              isDel: result.isDel,
              role: result.role,
            };
            const token = await jwt.sign(payload, secret);
            console.log(hashedPass);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("invalid email or passowrd");
          }
        } else {
          res.status(400).json("invalid email or passowrd");
        }
      } else {
        res.status(404).json("email does not exist");
      }
    })
    .catch((err) => res.status(400).json(err));
};

//get all users
const getAllUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//delete user (soft delete)
const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { isDel: true })
    .then((result) => {
      if (result) {
        res.status(200).json("deleted");
      } else {
        res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, login, getAllUsers, deleteUser };
