const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");

//Routers

db.sequelize.sync().then(() => {
  app.listen(3306, () => {
    console.log("Server is running on port 3306...");
  });
});
