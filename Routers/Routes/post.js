const express = require("express");
const postRouter = express.Router();
const { addPost , getAllPosts , getOnePost , getUserPost , updatePost , deletePost } = require("./../Controllers/post");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization")


postRouter.post("/createPosts" , addPost);
postRouter.get("/getAllPosts" , getAllPosts);
postRouter.get("/getOnePost/:_id" , getOnePost);
postRouter.get("/getUserPost/:users" , getUserPost);
postRouter.put("/updatePost" , updatePost);
//
postRouter.delete("/deletePost/:_id" , authentication , authorization , deletePost);


module.exports = postRouter;