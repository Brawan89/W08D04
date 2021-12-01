const postModel = require("./../../db/models/post");

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
      .find({ users , isDel: false })
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
const updatePost = (req , res) => {
    const { _id , img , dec , users } = req.body;
    postModel
    .findByIdAndUpdate({ _id , users , isDel: false },{
        img,
        dec,
    })
    .then((result) => {
        if (result) {
            res.status(200).json(" update post");
          } else {
            res.status(400).json("This post not found");
          }
    })
    .catch((error) => {
        res.status(400).json(error)
    })
}




module.exports = { addPost, getAllPosts, getOnePost , getUserPost , updatePost };
