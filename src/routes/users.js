const { Router } = require("express");
const jwt = require("../Services/jwt");
const UserController = require("../Controllers/UserController");

const routes = Router();

routes.post("/signin", UserController.signIn);
routes.post("/signup", UserController.signUp);
routes.post("/validateUser", jwt.verifyJWT, UserController.validateAccount);

module.exports = routes;
