const express = require("express");
const app = express();
const router = require("./app/index.routes");

app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.use(express.json());

app.use(router);

const port = 8080;

app.listen(port, () => {
  console.log("server run in port " + port);
});
