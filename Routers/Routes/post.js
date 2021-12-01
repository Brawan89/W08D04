const express = require("express");
const postRouter = express.Router();
const { addPost } = require("./../Controllers/post");

postRouter.post("/createPosts" , addPost)


module.exports = postRouter;