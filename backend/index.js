const express = require("express");
const cors = require("cors");
const { Users } = require("./models");
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

// Sync and start the server
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3002, "0.0.0.0", () => {
      console.log("Server running on port 3002");
    });
  })
  .catch((error) => console.log("Error syncing database:", error));
