const express = require("express");
const postRouter = express.Router();
const { addPost , getAllPosts } = require("./../Controllers/post");

postRouter.post("/createPosts" , addPost);
postRouter.get("/getAllPosts" , getAllPosts);



module.exports = postRouter;