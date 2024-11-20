const express = require("express");
const router = express.Router();
const { commentRate, threadRate, Users, Comment } = require("../models");

//Liking a thread
router.post("/", async (req, res) => {
  try {
    const { userID, rating, threadID } = req.body;
    await threadRate.create({
      userID: userID,
      rating: rating,
      threadID: threadID,
    });
    return res.json("Thread liked");
  } catch (error) {
    res.status(500).send("Could not like thread:", error);
  }
});

module.exports = router;
