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
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const userRouter = require("./routers/Users");
app.use("/auth", userRouter);

const threadRouter = require("./routers/Thread");
app.use("/thread", threadRouter);

// Sync and start the server
db.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(3002, "0.0.0.0", () => {
      console.log("Server running on port 3002");
    });
  })
  .catch((error) => console.log("Error syncing database:", error));
