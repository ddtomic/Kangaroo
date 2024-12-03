const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();
const db = require("./models");

// Define the paths to your SSL certificate and key files (from Certbot)
const options = {
  cert: fs.readFileSync("/etc/letsencrypt/live/kangarooo.click/fullchain.pem"), // Replace with your cert path
  key: fs.readFileSync("/etc/letsencrypt/live/kangarooo.click/privkey.pem"), // Replace with your key path
};

const corsOptions = {
  origin: ["https://kangarooo.click", "http://localhost:3000"],
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

// Sync and start the HTTPS server
db.db.sequelize
  .sync({ force: true })
  .then(() => {
    // Use HTTPS server here
    https.createServer(options, app).listen(3002, "0.0.0.0", () => {
      console.log("HTTPS Server running on https://kangarooo.click:3002");
    });
  })
  .catch((error) => console.log("Error syncing database:", error));
