const { Router } = require("express");
const jwt = require("../Services/jwt");
const CardController = require("../Controllers/CardController");

const routes = Router();

routes.post("/createToken", CardController.requestToken);

module.exports = routes;
