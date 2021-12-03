const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");

//create comment
const addComment = (req, res) => {
  const { comment, posts } = req.body;
  const newComment = new commentModel({
    comment,
    posts,
    users: req.token.id,
  });
  newComment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get al comments
const getAllComments = (req, res) => {
  commentModel
    .find({ isDel: false })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("comment not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports = { addComment  , getAllComments };
