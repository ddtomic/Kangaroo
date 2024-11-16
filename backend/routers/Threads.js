const express = require("express");
const router = express.Router();
const { Thread } = require("../models");

router.post("/create", async (req, res) => {
  const { threadTitle, threadContent, userID } = req.body;
  await Thread.create({
    threadTitle,
    threadContent,
    userID,
  });
  return res.json("Thread created");
});

router.get("/date", async (req, res) => {
  const threadListDates = await Thread.findAll();
  res.json(threadListDates);
});
