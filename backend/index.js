const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

//Routers
const userRouter = require("./routers/Users");
app.use("/auth", userRouter);

db.sequelize
  .sync({ force: false })
  .then(() => {
    // Start the server
    app.listen(3002, "0.0.0.0", () => {
      console.log(`Server running on port 3002`);
    });
  })
  .catch((error) => console.log("Error syncing database:", error));
