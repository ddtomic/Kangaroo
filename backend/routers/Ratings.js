const express = require("express");
const router = express.Router();
const { commentRate, threadRate, Users, Comment } = require("../models");

//Rate a thread
router.post("/thread", async (req, res) => {
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
        return res.status(200).send("Rating updated");
      }
    } else {
      await threadRate.create({
        userID: userID,
        rating: rating,
        threadID: threadID,
      });
      return res.status(201).send("Rating created");
    }
  } catch (error) {
    if (error === "SequelizeUniqueConstraintError") {
      return res.status(500).send("User has already rated this thread:", error);
    } else {
      return res.status(500).send("Could not rate thread:", error);
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

    return res.json(finalData);
  } catch (error) {
    return res.status(400).send("Could not get thread ratings");
  }
});
//Get all thread ratings
router.get("/threadrates", async (req, res) => {
  try {
    const threadRates = await threadRate.findAll();

    return res.json(threadRates);
  } catch (error) {
    return res.status(500).send("Could not get thread ratings:", error);
  }
});

//Rate a comment
router.post("/comment", async (req, res) => {
  try {
    const { userID, rating, commentID } = req.body;

    const existingRate = await commentRate.findOne({
      where: { userID: userID, commentID: commentID },
    });
    if (existingRate) {
      if (existingRate.rating === rating) {
        existingRate.rating = "n";
        await existingRate.save();
        return res.status(200).send("Rating removed");
      } else {
        existingRate.rating = rating;
        await existingRate.save();
        return res.status(200).send("Rating updated");
      }
    } else {
      await commentRate.create({
        userID: userID,
        rating: rating,
        commentID: commentID,
      });
      return res.status(201).send("Rating created");
    }
  } catch (error) {
    if (error === "SequelizeUniqueConstraintError") {
      return res
        .status(500)
        .send("User has already rated this comment:", error);
    } else {
      return res.status(500).send("Could not rate comment:", error);
    }
  }
});

//Get all comment ratings for a specific comment
router.get("/commentrates/:commentID", async (req, res) => {
  try {
    const { commentID } = req.params;
    const ratings = await commentRate.findAll({
      where: { commentID: commentID },
    });
    const likescore = await commentRate.count({
      where: {
        commentID: commentID,
        rating: "l",
      },
    });

    const dlikescore = await commentRate.count({
      where: {
        commentID: commentID,
        rating: "d",
      },
    });
    const scoring = likescore - dlikescore;
    //console.log("Score:", scoring);
    const finalData = {
      ratings,
      score: scoring ? scoring : 0,
    };

    return res.json(finalData);
  } catch (error) {
    return res.status(400).send("Could not get thread ratings");
  }
});

//Get all comment ratings
router.get("/commentrates", async (req, res) => {
  try {
    const commentrates = await commentRate.findAll();

    return res.json(commentrates);
  } catch (error) {
    return res.status(500).send("Could not get comment ratings:", error);
  }
});

module.exports = router;
