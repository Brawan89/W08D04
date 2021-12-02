const express = require("express");
const postRouter = express.Router();
const { addPost , getAllPosts , getOnePost , getUserPost , updatePost , deletePost } = require("./../Controllers/post");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization")


postRouter.post("/createPosts", authentication , addPost);
postRouter.get("/getAllPosts", authentication , getAllPosts);
postRouter.get("/getOnePost/:_id" , authentication , getOnePost);
postRouter.get("/getUserPost/:users", authentication , getUserPost);
postRouter.put("/updatePost", authentication , updatePost);
//
postRouter.delete("/deletePost/:_id" , authentication , deletePost);




module.exports = postRouter;