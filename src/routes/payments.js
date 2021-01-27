const { Router } = require("express");
const jwt = require("../Services/jwt");
const PaymentController = require("../Controllers/PaymentController");

const routes = Router();

routes.post("/cardPayment", PaymentController.requestCardPayment);

module.exports = routes;
