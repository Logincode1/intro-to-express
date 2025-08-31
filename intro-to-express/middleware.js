const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("This is such a cool server wow");
  next();
});

module.exports = app;
