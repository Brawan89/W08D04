const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

const authentication = (req, res, next) => {
  try {
      //headers.key -> req
      //key -> authorization
    console.log(req.headers.authorization);
    //check -> does not exist
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "forbidden" });
    }

    // token -> valid or not 
    // token = valid =>>  return payload -> called parsedToken

    const token = req.headers.authorization.split(" ")[1];
    const parsedToken = jwt.verify(token, secret);
    console.log(parsedToken);
    req.token = parsedToken;
    next();
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authentication;