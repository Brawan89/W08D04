const express = require("express");
const postRouter = express.Router();
const { addPost , getAllPosts , getOnePost } = require("./../Controllers/post");

postRouter.post("/createPosts" , addPost);
postRouter.get("/getAllPosts" , getAllPosts);
postRouter.get("/getOnePost/:_id" , getOnePost);




module.exports = postRouter;