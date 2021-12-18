const express = require("express");
const userRouter = express.Router();
const { register , login ,getAllUsers, deleteUser } = require("./../Controllers/user");


const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization");

userRouter.post("/register" , register);
userRouter.post("/login" , login);

// admin -> role
userRouter.get("/allusers", authentication, authorization,  getAllUsers);
// 
userRouter.get("/delusers", authentication, authorization,  deleteUser);


module.exports = userRouter;