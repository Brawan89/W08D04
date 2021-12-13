const express = require("express");
const userRouter = express.Router();
const { register, activeAccount,forgotPassword, resetPassword ,login, googlelogin ,getAllUsers , deleteUser } = require("./../Controllers/user");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization")

// admin 
userRouter.get("/allusers", authentication, authorization , getAllUsers);
//
userRouter.post("/register" , register);
userRouter.post("/activeAccount" ,  activeAccount);
userRouter.put("/forgotPassword", forgotPassword);
userRouter.put("/resetPassword", resetPassword);


userRouter.post("/login" , login);
userRouter.post("/googlelogin" , googlelogin);

userRouter.delete("/deleteUser/:id" , authentication, authorization ,  deleteUser);






module.exports = userRouter;