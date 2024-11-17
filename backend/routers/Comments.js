const express = require("express");
const router = express.Router();
const {
  Thread,
  threadRate,
  commentRate,
  Users,
  Comment,
} = require("../models");

//Comments are posted
router.post("/", async (req, res) => {});

//Get all comments of a thread
router.get();

//Get all comments of a user
router.get();
