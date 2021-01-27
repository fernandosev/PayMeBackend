require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
const http = require("http");
const { sendMail } = require("./src/Services/mail");
const app = express();
const server = http.Server(app);

app.use(express.json());

app.use(routes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3333;
}

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

server.listen(port, function () {
  console.log(`Server started Successfully on port ${port}`);
});
