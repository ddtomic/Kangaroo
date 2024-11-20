const express = require("express");
const router = express.Router();
const { commentRate, threadRate, Users, Comment } = require("../models");

//Rate a thread
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
    if (error === "SequelizeUniqueConstraintError") {
      res.status(500).send("User has already rated this thread:", error);
    } else {
      res.status(500).send("Could not like thread:", error);
    }
  }
});

//Get all thread ratings
router.get("/threadrates", async (req, res) => {
  try {
    const threadRates = await threadRate.findAll();

    res.json(threadRates);
  } catch (error) {
    res.status(500).send("Could not get thread ratings:", error);
  }
});

module.exports = router;
