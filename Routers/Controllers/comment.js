const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post")

//create comment
const addComment = (req, res) => {
    const userId=req.token.id;
  const { comment, posts } = req.body;
        try{postModel
          .findOne({ $and: [{ _id: posts }, { isDel: false }] })
          .then((result) => {
            if (result) {
              const newComment = new commentModel({
                comment,
                users:userId,
                posts,
              });
              newComment
                .save()
                .then((result) => {
                  res.status(200).json(result);
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            } else {
              res.status(400).json("Post not found");
            }
          })
          .catch((err) => {
            res.status(400).json("Post not found");
          });
        }catch(err){
            res.status(400).send(err);
        }
      
};



// get al comments
const getAllComments = (req, res) => {
  commentModel
  .find({ isDel: false })
  .populate("user")
  .then((result) => {
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No comments");
    }
  })
  .catch((err) => {
    res.status(400).send(err);
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
  const { postId, comId } = req.params;

  comModel
    .findOneAndUpdate(
      { _id: comId, users: req.token.id, posts: postId, isDel: false },
      { isDel: true },
      { new: true }
    )
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).send("Deleted successfully");
      } else {
        res.status(404).send("Failed deleted");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
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
