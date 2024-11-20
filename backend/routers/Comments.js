const express = require("express");
const router = express.Router();
const { Thread, threadRate, Users, Comment } = require("../models");

//Post a comment
router.post("/", async (req, res) => {
  try {
    const { userID, comment, threadID } = req.body;
    await Comment.create({
      userID: userID,
      content: comment,
      threadID: threadID,
    });
    return res.json("Comment created");
  } catch (error) {
    res.status(500).send("Could not post comment:", error);
  }
});

//Get all comments
router.get("/comms", async (req, res) => {
  try {
    const comments = await Comment.findAll(); // Sequelize method to fetch all records
    res.json(comments);
  } catch (error) {
    res.status(500).send("Error fetching comments:", error);
  }
});

module.exports = router;
