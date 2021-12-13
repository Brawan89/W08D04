const express = require("express");
const roleRouter = express.Router();
const { creatRole, getRoles } = require("./../Controllers/role");

const authentication = require("./../midleware/Authentication");
const authorization = require("./../midleware/Authorization")


roleRouter.post("/createRole", authentication, authorization ,creatRole);
roleRouter.get("/roles", /*authentication, authorization ,*/getRoles);

module.exports = roleRouter;