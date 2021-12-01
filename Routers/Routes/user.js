const express = require("express");
const userRouter = express.Router();
const { register , login ,getAllUsers , deleteUser } = require("./../Controllers/user");

userRouter.post("/register" , register);
userRouter.post("/login" , login);

// admin -> role
userRouter.get("/allusers", getAllUsers);

userRouter.delete("/deleteUser/:id" , deleteUser)


module.exports = userRouter;