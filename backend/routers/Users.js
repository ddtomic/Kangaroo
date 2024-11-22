const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");
const { sign } = require("jsonwebtoken");

//Creating an account
router.post("/", (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
        bio: bio,
      });
      return res.json("Success!");
    });
  } catch (error) {
    return res.status(500).send("Can't create user:", error);
  }
});

//Logging into an account
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) return res.json({ error: "User doesn't exist!" });

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) return res.json({ error: "Password is wrong!" });

      const accessToken = sign(
        { username: user.username, id: user.userID },
        "nrQaoHnpKNNi1izsQZrBhdAZU"
      );
      return res.json({
        token: accessToken,
        username: username,
        id: user.userID,
      });
    });
  } catch (error) {
    return res.status(500).send("Login failed:", error);
  }
});

//Get all users (just for testing)
router.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll(); // Sequelize method to fetch all records
    return res.json(users);
  } catch (error) {
    return res.status(500).send("Error fetching users");
  }
});

//Get all threads liked by a specific user
router.get("/threadlikes/:userID", async (req, res) => {
  try {
    const user = req.params;
    const threadLikes = await threadRate.findAll({ where: { userID: user } });
    return res.json(threadLikes);
  } catch (error) {
    return res.status(500).send("Could not get thread likes for user");
  }
});
//Verify login token
router.get("/", validateToken, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
