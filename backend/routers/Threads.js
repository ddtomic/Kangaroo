const express = require("express");
const router = express.Router();
const { Thread, threadRate, Users, Comment } = require("../models");

router.post("/create", async (req, res) => {
  try {
    const { threadTitle, threadContent, userID } = req.body;
    await Thread.create({
      title: threadTitle,
      content: threadContent,
      userID: userID,
    });
    return res.json("Thread created");
  } catch (error) {
    return res.status(500).send("Could not create thread:", error);
  }
});

//Delete a specific thread
router.delete("/threads/:threadID", async (req, res) => {
  try {
    const { threadID } = req.params;
    const thread = await Thread.destroy({
      where: { threadID: threadID },
    });

    if (thread) {
      res.status(200).json({
        message: "Thread and associated comments deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Thread not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the thread" });
  }
});

/*
Get threads from newest to oldest (descending)
data = {
  threadID -> ID of a thread,
  title -> Title of a thread,
  content -> Content of a thread,
  userID -> ID of the user who made the thread,
  userThread.username -> username of the user who made the thread
}
*/
router.get("/date", async (req, res) => {
  try {
    const threadListDates = await Thread.findAll({
      include: [
        { model: Users, attributes: ["username", "pfp"], as: "userThread" },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json(threadListDates);
  } catch (error) {
    return res.status(500).send("Failed to get threads:", error);
  }
});

module.exports = router;
