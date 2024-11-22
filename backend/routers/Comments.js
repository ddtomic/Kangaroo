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
    return res.status(500).send("Could not post comment:", error);
  }
});

//Get all comments for a specific thread
router.get("/comms/:threadID", async (req, res) => {
  try {
    const { threadID } = req.params;
    const comments = await Comment.findAll({
      where: {
        threadID: threadID,
      },
      include: [
        {
          model: Users,
          attributes: ["userID", "username"],
          as: "userComment",
        },
      ],
    });
    return res.json(comments);
  } catch (error) {
    return res.status(400).send("Could not get thread ratings");
  }
});
//Get all comments
router.get("/comms", async (req, res) => {
  try {
    const comments = await Comment.findAll(); // Sequelize method to fetch all records
    return res.json(comments);
  } catch (error) {
    return res.status(500).send("Error fetching comments:", error);
  }
});

module.exports = router;
