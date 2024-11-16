const express = require("express");
const router = express.Router();
const { Thread, threadRate, commentRate, Users } = require("../models");

router.post("/create", async (req, res) => {
  const { threadTitle, threadContent, userID } = req.body;
  await Thread.create({
    title: threadTitle,
    content: threadContent,
    userID: userID,
  });
  return res.json("Thread created");
});

//Get threads from newest to oldest (descending)
router.get("/date", async (req, res) => {
  const threadListDates = await Thread.findAll({
    include: {
      model: Users,
      attributes: ["username"],
    },
    include: {
      model: commentRate,
      attributes: ["rating"],
    },
    include: {
      model: threadRate,
      attributes: ["rating"],
    },
    order: [["createdAt", "DESC"]],
  });

  res.json(threadListDates);
});

//Get threads from most to least liked (descending)
router.get("/like", async (req, res) => {
  const threadListDates = await Thread.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(threadListDates);
});

//Get threads from most to least comments (descending)
router.get("/comment", async (req, res) => {
  const threadListDates = await Thread.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(threadListDates);
});

module.exports = router;
