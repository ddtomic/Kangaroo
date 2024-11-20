const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

const corsOptions = {
  origin: [
    "http://<frontend-ip-or-domain>:<frontend-port>",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const userRouter = require("./routers/Users");
app.use("/auth", userRouter);

const threadRouter = require("./routers/Threads");
app.use("/thread", threadRouter);

const commentRouter = require("./routers/Comments");
app.use("/comment", commentRouter);

const rateRouter = require("./routers/Ratings");
app.use("/rate", rateRouter);

// Sync and start the server
db.db.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(3002, "0.0.0.0", () => {
      console.log("Server running on port 3002");
    });
  })
  .catch((error) => console.log("Error syncing database:", error));
