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
    res.status(500).send("Could not create thread:", error);
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
  comment -> Array of all comments owned by the thread,
  threadRatings -> Array of all ratings owned by thread,
}
*/
router.get("/date", async (req, res) => {
  try {
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

    const finalData = await Promise.all(
      threadListDates.map(async (thread) => {
        const comments = await Comment.findAll({
          where: {
            threadID: thread.threadID,
          },
          include: [
            {
              model: Users,
              attributes: ["userID", "username"],
              as: "userComment",
            },
          ],
        });

        return {
          ...thread.toJSON(),
          comments: comments.map((comment) => comment.toJSON()),
        };
      })
    );

    res.json(finalData);
  } catch (error) {
    res.status(500).send("Failed to get threads:", error);
  }
});

module.exports = router;
