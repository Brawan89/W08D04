const postModel = require("./../../db/models/post");

//create post
const addPost = (req , res) => {
    const { img , dec , users } = req.body;
    const newPost = new postModel({
        img,
        dec,
        users
    })
    newPost
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

// get all posts
const getAllPosts = (req, res) => {
    postModel
      .find({})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };








module.exports = { addPost , getAllPosts  };