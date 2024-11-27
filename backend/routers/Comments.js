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

//Delete a specific comment
router.delete("/comments/:commentID", async (req, res) => {
  try {
    const { commentID } = req.params;
    const comment = await Comment.destroy({
      where: { commentID: commentID },
    });

    if (comment) {
      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the comment" });
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
          attributes: ["userID", "username", "pfp"],
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
