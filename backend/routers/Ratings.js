const express = require("express");
const router = express.Router();
const { commentRate, threadRate, Users, Comment } = require("../models");

//Rate a thread
router.post("/", async (req, res) => {
  try {
    const { userID, rating, threadID } = req.body;
    const existingRate = await threadRate.findOne({
      where: { userID, threadID },
    });
    if (existingRate) {
      if (existingRate.rating === rating) {
        existingRate.rating = "n";
        await existingRate.save();
        return res.status(200).send("Rating removed");
      } else {
        existingRate.rating = rating;
        await existingRate.save();
        res.status(200).send("Rating updated");
      }
    } else {
      await threadRate.create({
        userID: userID,
        rating: rating,
        threadID: threadID,
      });
      res.status(201).send("Rating created");
    }
  } catch (error) {
    if (error === "SequelizeUniqueConstraintError") {
      res.status(500).send("User has already rated this thread:", error);
    } else {
      res.status(500).send("Could not like thread:", error);
    }
  }
});

//Get all thread ratings for a specific thread
router.get("/threadrates/:threadID", async (req, res) => {
  try {
    const { threadID } = req.params;
    const ratings = await threadRate.findAll({ where: { threadID: threadID } });
    const likescore = await threadRate.count({
      where: {
        threadID: threadID,
        rating: "l",
      },
    });

    const dlikescore = await threadRate.count({
      where: {
        threadID: threadID,
        rating: "d",
      },
    });
    const scoring = likescore - dlikescore;
    //console.log("Score:", scoring);
    const finalData = {
      ratings,
      score: scoring ? scoring : 0,
    };

    res.json(finalData);
  } catch (error) {
    res.status(400).send("Could not get thread ratings");
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
