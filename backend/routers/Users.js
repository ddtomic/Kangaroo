const express = require("express");
const router = express.Router();
const { Users, threadRate, commentRate, Comment } = require("../models");
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

//Get a specific thread liked by a specific user
router.get("/threadlikes/:userID/:threadID", async (req, res) => {
  try {
    const { userID, threadID } = req.params;
    const threadLike = await threadRate.findOne({
      where: { userID: userID, threadID: threadID },
      attributes: ["rating"],
    });
    if (!threadLike) {
      return res.status(404).send("Never been rated");
    }
    return res.json(threadLike.rating);
  } catch (error) {
    return res.status(500).send("Could not get thread likes for user");
  }
});

//Get all comments rated by a specific user in a specific thread
router.get("/commentlikes/:userID/:threadID", async (req, res) => {
  try {
    const { userID, threadID } = req.params;

    const commentRatings = await commentRate.findAll({
      where: { userID: userID },
      include: [
        {
          model: Comment,
          where: { threadID: threadID },
          as: "commentRating",
          attributes: [],
        },
      ],
      attributes: ["commentID", "rating"],
    });

    if (commentRatings.length === 0) {
      return res
        .status(404)
        .send("No ratings found for comments in this thread");
    }

    return res.json(commentRatings);
  } catch (error) {
    console.error("Error fetching comment ratings:", error);
    return res.status(500).send("Could not fetch comment ratings");
  }
});

//Verify login token
router.get("/", validateToken, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
