const postModel = require("./../../db/models/post");
// const roleModel = require("./../../db/models/role")
const likeModel = require("./../../db/models/like");

//create post
const addPost = (req, res) => {
  const { img, dec, users } = req.body;
  const newPost = new postModel({
    img,
    dec,
    users,
  });
  newPost
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get all posts
//post not delete
const getAllPosts = (req, res) => {
  postModel
    .find({ isDel: false })
    .populate("users")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("post not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get one post -> id
//post not delete
const getOnePost = (req, res) => {
  const { _id } = req.params;
  postModel
    .find({ _id, isDel: false })
    .populate("users")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("post not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// get post  by userId
const getUserPost = (req, res) => {
  const { users } = req.params;
  postModel
    .find({ users, isDel: false })
    .populate("users")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("This post not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//update post
const updatePost = (req, res) => {
  const { _id, img, dec } = req.body;
  postModel
    .findByIdAndUpdate(
      { _id, isDel: false },
      {
        img,
        dec,
      }
    )
    .populate("users")
    .then((result) => {
      if (!result) {
        res.status(400).json(" This post not found");
      } else {
        res.status(200).json("update post");
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

// delete post
const deletePost = (req, res) => {
  const { _id } = req.params;
  postModel
    .findByIdAndUpdate(
      { _id, users: req.token.id, isDel: false },
      { isDel: true },
      { new: true }
    )
    .populate("users")
    .then((result) => {
      if (result) {
        res.status(200).json("deleted");
      } else {
        res.status(403).json("post not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//like
const addLikes = (req, res) => {
  const { posts } = req.params;
  const { like } = req.body;

  if (like) {
    likeModel
      .findOne(
        { posts, users: req.token.id })
      .then((result) => {
        if (result) {
          likeModel
            .findOneAndUpdate(
              { posts, users: req.token.id, like: false },
              { like: true },
              { new: true }
            )
            .then((result) => {
              if (result) {
                res.status(200).json(result);
              } else {
                res.status(404).json("post not found");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          const like = new likeModel({
            posts,
            users: req.token.id,
          });
          like
            .save()
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    likeModel
      .findOneAndUpdate(
        { posts, users: req.token.id, like: true },
        { like: false },
        { new: true }
      )
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json("post not found");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = {
  addPost,
  getAllPosts,
  getOnePost,
  getUserPost,
  updatePost,
  deletePost,
  addLikes,
};
