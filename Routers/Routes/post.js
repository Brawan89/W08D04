const express = require("express");
const postRouter = express.Router();
const {
  addPost,
  getAllPosts,
  getOnePost,
  getUserPost,
  updatePost,
  deletePost,
  adminDeletePost,
  addLikes,
} = require("./../Controllers/post");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization");

postRouter.post("/createPosts", authentication, addPost);
postRouter.get("/getAllPosts", authentication,  getAllPosts);
postRouter.get("/getOnePost/:_id", getOnePost);
postRouter.get("/getUserPost/:users", authentication ,getUserPost);
postRouter.put("/updatePost/:id", authentication, updatePost);
//
postRouter.delete("/deletePost/:_id", authentication, deletePost);
// just admin delete post
postRouter.delete(
  "/adminDeletePost/:_id",
  authentication,
  authorization,
  adminDeletePost
);

//like post
postRouter.put("/addLikes/:posts", authentication, addLikes);

module.exports = postRouter;
