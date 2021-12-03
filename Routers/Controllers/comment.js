const commentModel = require("./../../db/models/comment");

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

//update Comment
const updateComment = (req, res) => {
  const { _id, comment, posts } = req.body;
  commentModel
    .findByIdAndUpdate(
      { _id, posts, users: req.token.id, isDel: false },
      {
        comment,
      }
    )
    .then((result) => {
      if (result) {
        res.status(400).json("yes updated");
      } else {
        res.status(200).json("not found any Comment");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//delete comment
const deletComment = (req, res) => {
  const { id } = req.params;
  const { posts } = req.body;
  commentModel
    .findOneAndUpdate(
      { id, posts, users: req.token.id, isDel: false },
      { isDel: true },
      { new: true }
    )
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(201).json("Deleted");
      } else {
        res.status(404).json("Comment Already Deleted");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//delet oment by just admin
const adminDeleteComment = (req, res) => {
  // const { id } = req.params;
  const { id , posts , users } = req.body;
  commentModel
    .findOneAndUpdate(
      { id, posts, users , isDel: false },
      { isDel: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(201).json("deleted");
      } else {
        res.status(404).json("Comment Already Deleted");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  addComment,
  updateComment,
  getAllComments,
  deletComment,
  adminDeleteComment,
};
