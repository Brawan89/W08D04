const express = require("express");
const userRouter = express.Router();
const { register, activeAccount,forgotPassword, resetPassword , login ,getAllUsers , deleteUser } = require("./../Controllers/user");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization")

// admin 
userRouter.get("/allusers", authentication, authorization , getAllUsers);
//
userRouter.post("/register" , register);
userRouter.post("/activeAccount", activeAccount);
userRouter.put("/forgotPassword", forgotPassword);
userRouter.put("/resetPassword", resetPassword);


userRouter.post("/login" , login);
userRouter.delete("/deleteUser/:id" , authentication, authorization ,  deleteUser);






module.exports = userRouter;