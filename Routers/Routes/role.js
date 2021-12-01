const express = require("express");
const roleRouter = express.Router();
const { creatRole, getRoles } = require("./../Controllers/role");


roleRouter.post("/createRole", creatRole);

roleRouter.get("/roles",  getRoles);

module.exports = roleRouter;
