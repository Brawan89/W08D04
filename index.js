const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());


require("./db");


//role
const roleRouter = require("./Routers/Routes/role");
app.use(roleRouter);

//user
const userRouter = require("./Routers/Routes/user");
app.use(userRouter);

//post
const postRouter = require("./Routers/Routes/post");
app.use(postRouter);

//comment
const commentRouter = require("./Routers/Routes/comment");
app.use(commentRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server run on ${PORT}`);
})