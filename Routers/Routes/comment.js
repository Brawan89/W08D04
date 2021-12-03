const express = require("express");
const commentRouter = express.Router();

const { addComment , getAllComments   } = require("./../Controllers/comment");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization");

commentRouter.post("/addComment", authentication , addComment);
commentRouter.get("/getAllComments" , getAllComments)

module.exports = commentRouter;