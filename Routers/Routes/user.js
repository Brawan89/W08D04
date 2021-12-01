const express = require("express");
const userRouter = express.Router();
const { register , login ,getAllUsers } = require("./../Controllers/user");

userRouter.post("/register" , register);
userRouter.post("/login" , login);

// admin -> role
userRouter.get("/allusers", getAllUsers);


module.exports = userRouter;