const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: String, // active | created | blocked
});

module.exports = mongoose.model("Payment", PaymentSchema);
