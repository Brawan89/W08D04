const express = require("express");
const userRouter = express.Router();
const { register , login ,getAllUsers , deleteUser } = require("./../Controllers/user");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization")

// admin 
userRouter.get("/allusers", authentication, authorization ,getAllUsers);
//
userRouter.post("/register" , register);
userRouter.post("/login" , login);
userRouter.delete("/deleteUser/:id" , deleteUser)


module.exports = userRouter;