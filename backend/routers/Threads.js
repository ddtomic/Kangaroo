const express = require("express");
const router = express.Router();
const { Thread, threadRate, Users, Comment } = require("../models");

router.post("/create", async (req, res) => {
  const { threadTitle, threadContent, userID } = req.body;
  await Thread.create({
    title: threadTitle,
    content: threadContent,
    userID: userID,
  });
  return res.json("Thread created");
});

/*
Get threads from newest to oldest (descending)
data = {
  threadID -> ID of a thread,
  title -> Title of a thread,
  content -> Content of a thread,
  userID -> ID of the user who made the thread,
  userThread.username -> username of the user who made the thread
  comment -> Array of all comments owned by the thread,
  threadRatings -> Array of all ratings owned by thread,
}
*/
router.get("/date", async (req, res) => {
  const threadListDates = await Thread.findAll({
    include: [
      {
        model: threadRate,
        attributes: ["rating"],
        as: "threadRatings",
      },
      { model: Users, attributes: ["username"], as: "userThread" },
    ],
    order: [["createdAt", "DESC"]],
  });

  const commentCounts = await Promise.all(
    threadListDates.map(async (thread) => {
      const commentCount = await Comment.findAll({
        where: {
          threadID: thread.threadID,
        },
      });
      return {
        threadID: thread,
        commentCount,
      };
    })
  );

  const finalData = threadListDates.map((thread) => {
    const count = commentCounts.find(
      (item) => item.threadID === thread.threadID
    );
    return {
      ...thread.toJSON(),
      commentCount: count.length > 0 ? count.commentCount : [],
    };
  });
  res.json(finalData);
});

module.exports = router;
