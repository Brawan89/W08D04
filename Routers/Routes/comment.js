const express = require("express");
const commentRouter = express.Router();

const { addComment , getAllComments , updateComment  } = require("./../Controllers/comment");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization");

commentRouter.post("/addComment", authentication , addComment);
commentRouter.get("/getAllComments" , getAllComments)
commentRouter.put("/updateComment", authentication, updateComment);

module.exports = commentRouter;