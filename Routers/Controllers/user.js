const userModel = require("./../../db/models/user");
const passport = require("passport");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

const mailgun = require("mailgun-js");
// const res = require("express/lib/response");
const DOMAIN =
  "https://api.mailgun.net/v3/sandboxf7f6d9f615864af7ae695db33874f4a9.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const clientAuth = new OAuth2Client(
  "370506827743-5hqo8bs3mk6shn6hmof7be045p8sjkl7.apps.googleusercontent.com"
);

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

//create users
const register = async (req, res) => {
  const { userName, email, password /*isDel, avatar, role*/ } = req.body;

  // email -> lowerCase
  const saveEmail = email.toLowerCase();
  //encryption password
  const savedPass = await bcrypt.hash(password, SALT);

  userModel.findOne({ email: saveEmail }).exec((err, user) => {
    if (user) {
      res.status(400).json({ error: "user with this email already exists." });
    }
    const payload = {
      email: saveEmail,
      userName,
      password: savedPass,
    };
    const options = { expiresIn: "20m" };

    const token = jwt.sign(payload, secret, options);

    const data = {
      from: "noreply@hello.com",
      to: email,
      subject: "Account Activation Link",
      html: `
      <h2>Please click on given link to activate your account</h2>
      <a href = "${process.env.CLIENT_URL}/authentication/activate/${token}"></a>
      `,
    };
    mg.messages().send(data, function (error) {
      if (error) {
        return res.json(error);
      } else {
        res.json({
          message: "Email has been sent, kindly activate your account",
        });
      }
    });
  });
};
// active account
const activeAccount = (req, res) => {
  const { tken } = req.body;
  console.log(req.body);
  if (tken) {
    jwt.verify(tken, secret, (err, decodeToken) => {
      if (err) {
        res.status(400).json({ error: "Incorrect or Expired link" });
      } else {
        const { email, userName, password } = decodeToken;
        userModel
          .findOne({ email })
          .then((result) => {
            if (result) {
              res.status(400).send("Email is already in use!");
            } else {
              const newUser = new userModel({
                email,
                userName,
                password,
              });
              if (
                password.length > 8 &&
                /\d/.test(password) &&
                /[a-z]/.test(password) &&
                /[A-Z]/.test(password) &&
                /[!@#$%&*_+\-=\[\];':"\\|,.<>\/?~]/.test(password)
              )
                newUser
                  .save()
                  .then((result) => {
                    res.status(200).send("Signup successfully");
                  })
                  .catch((err) => {
                    res.status(400).send(err);
                  });
            }
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
  } else {
    res.status(400).send("Somthing went wrong!");
  }
};

//forgot password
const forgotPassword = (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({ error: "user with this email already exists." });
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "7d",
    });

    const data = {
      from: "noreply@hello.com",
      to: email,
      subject: "Account Activation Link",
      html: `
    <h2>Please click on given link to reset your password</h2>
    <p> ${process.env.CLIENT_URL}/resetpassword/${token}</p>
    `,
    };
    return userModel.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "reset password link error" });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            return res.json({
              error: err.message,
            });
          }
          return res.json({
            message: "Email has been sent, kindly follow the instructions",
          });
        });
      }
    });
  });
};

//reset Password
const resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      function (error, decodedData) {
        if (error) {
          return res
            .status(401)
            .json({ error: "Incorrect token or it is expirod." });
        }
        userModel.findOne({ resetLink }, (err, user) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ error: "user with this token does not exist." });
          }
          const obj = {
            password: newPass,
            resetLink: "",
          };
          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: "reset password error" });
            } else {
              return res
                .status(200)
                .json({ message: "Your password has been changed," });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ erroe: "Authentication error!!" });
  }
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
// login with google
const googlelogin = (req, res) => {
  const { tokenId } = req.body;

  clientAuth
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "370506827743-5hqo8bs3mk6shn6hmof7be045p8sjkl7.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verfied, userName, email } = response.payload;
      if (email_verfied) {
        userModel.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ error: "something went wrong..." });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: "7d" }
              );
              const { _id, userName, email } = user;
              res.json({ token, user: { _id, userName, email } });
            } else {
              let password = email + process.env.JWT_SIGNIN_KEY;
              let newUser = new userModel({ userName, email, password });
              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({ error: "somthing wrong..." });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SIGNIN_KEY,
                  { expiresIn: "7d" }
                );
                const { _id, userName, email } = newUser;
                res.json({ token, user: { _id, userName, email } });
              });
            }
          }
        });
      }
    });
};

//get all users
const getAllUsers = (req, res) => {
  userModel
    .find({ isDel: false })
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

module.exports = {
  register,
  activeAccount,
  forgotPassword,
  resetPassword,
  login,
  googlelogin,
  getAllUsers,
  deleteUser,
};
