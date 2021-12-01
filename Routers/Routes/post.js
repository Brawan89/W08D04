const express = require("express");
const postRouter = express.Router();
const { addPost , getAllPosts , getOnePost , getUserPost } = require("./../Controllers/post");

postRouter.post("/createPosts" , addPost);
postRouter.get("/getAllPosts" , getAllPosts);
postRouter.get("/getOnePost/:_id" , getOnePost);
postRouter.get("/getUserPost/:users" , getUserPost);




module.exports = postRouter;