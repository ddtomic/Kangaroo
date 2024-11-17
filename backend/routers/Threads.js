const express = require("express");
const router = express.Router();
const {
  Thread,
  threadRate,
  commentRate,
  Users,
  Comment,
} = require("../models");

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
      const commentCount = await Comment.count({
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
      commentCount: count ? count.commentCount : 0,
    };
  });
  res.json(finalData);
});

module.exports = router;
