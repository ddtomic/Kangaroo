const express = require("express");
const router = express.Router();
const {
  Thread,
  threadRate,
  commentRate,
  Users,
  Comment,
} = require("../models");

//Post a thread
router.post("/create", async (req, res) => {
  const { threadTitle, threadContent, userID } = req.body;
  await Thread.create({
    title: threadTitle,
    content: threadContent,
    userID: userID,
  });
  return res.json("Thread created");
});

//Get a specific thread page
router.get("/:threadTitle", async (req, res) => {
  const title = req.params.threadTitle;
  const thread = await Thread.findOne({ where: { title: threadTitle } });
  return res.json(thread);
});

//Get threads from newest to oldest (descending)
router.get("/date", async (req, res) => {
  //gets all threads
  const threadListDates = await Thread.findAll({
    include: { model: Users, attributes: ["username"], as: "userThread" },
    order: [["createdAt", "DESC"]],
  });
  //counts ratings and comments
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
  const ratingCounts = await Promise.all(
    threadListDates.map(async (thread) => {
      const ratingCount = await threadRate.count({
        where: {
          threadID: thread.threadID,
        },
      });
      return {
        threadID: thread,
        ratingCount,
      };
    })
  );
  //adds rating and comment count to response JSON
  const finalData = threadListDates.map((thread) => {
    const count = commentCounts.find(
      (item) => item.threadID === thread.threadID
    );
    const rcount = ratingCounts.find(
      (item) => item.threadID === thread.threadID
    );
    return {
      ...thread.toJSON(),
      commentCount: count ? count.commentCount : 0,
      ratingCount: rcount ? rcount.ratingCount : 0,
    };
  });
  res.json(finalData);
});

//Get threads from most to least liked (descending)
router.get("/like", async (req, res) => {
  //gets all threads
  const threadListDates = await Thread.findAll({
    include: { model: Users, attributes: ["username"], as: "userThread" },
    order: [["createdAt", "DESC"]],
  });
  //counts ratings and comments
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
  const ratingCounts = await Promise.all(
    threadListDates.map(async (thread) => {
      const ratingCount = await threadRate.count({
        where: {
          threadID: thread.threadID,
        },
      });
      return {
        threadID: thread,
        ratingCount,
      };
    })
  );
  //adds rating and comment count to response JSON
  const finalData = threadListDates.map((thread) => {
    const count = commentCounts.find(
      (item) => item.threadID === thread.threadID
    );
    const rcount = ratingCounts.find(
      (item) => item.threadID === thread.threadID
    );
    return {
      ...thread.toJSON(),
      commentCount: count ? count.commentCount : 0,
      ratingCount: rcount ? rcount.ratingCount : 0,
    };
  });
  res.json(finalData);
});

//Get threads from most to least comments (descending)
router.get("/comment", async (req, res) => {
  //gets all threads
  const threadListDates = await Thread.findAll({
    include: { model: Users, attributes: ["username"], as: "userThread" },
    order: [["createdAt", "DESC"]],
  });

  //counts ratings and comments
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
  const ratingCounts = await Promise.all(
    threadListDates.map(async (thread) => {
      const ratingCount = await threadRate.count({
        where: {
          threadID: thread.threadID,
        },
      });
      return {
        threadID: thread,
        ratingCount,
      };
    })
  );
  //adds rating and comment count to response JSON
  const finalData = threadListDates.map((thread) => {
    const count = commentCounts.find(
      (item) => item.threadID === thread.threadID
    );
    const rcount = ratingCounts.find(
      (item) => item.threadID === thread.threadID
    );
    return {
      ...thread.toJSON(),
      commentCount: count ? count.commentCount : 0,
      ratingCount: rcount ? rcount.ratingCount : 0,
    };
  });
  res.json(finalData);
});

module.exports = router;
