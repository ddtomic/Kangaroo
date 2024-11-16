const express = require("express");
const router = express.Router();
const { Threads } = require("../models");

router.post("/create", async (req, res) => {
  const { threadTitle, threadContent, userID } = req.body;
  await Threads.create({
    threadTitle,
    threadContent,
    userID,
  });
  return res.json("Thread created");
});

router.get("/date", async (req, res) => {
  const threadListDates = await Threads.findAll();
  res.json(threadListDates);
});
