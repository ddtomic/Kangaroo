const express = require("express");
const router = express.Router();
const { Thread, threadRate, Users, Comment } = require("../models");

//Post a comment
router.post("/", async (req, res) => {
  const { userID, threadID, comment } = req.body;
  await Comment.create({
    userID: userID,
    content: comment,
    threadID: threadID,
  });
  return res.json("Comment created");
});

module.exports = router;
