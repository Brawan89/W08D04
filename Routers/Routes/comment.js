const express = require("express");
const commentRouter = express.Router();

const { addComment , getAllComments , updateComment , deletComment , adminDeleteComment  } = require("./../Controllers/comment");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization");

commentRouter.post("/addComment", authentication , addComment);
commentRouter.get("/getAllComments" , getAllComments)
commentRouter.put("/updateComment", authentication, updateComment);
commentRouter.delete("/deletComment/:id", authentication, deletComment);
commentRouter.delete("/adminDeleteComment", authentication, authorization , adminDeleteComment);


module.exports = commentRouter;