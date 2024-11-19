const express = require("express");
const router = express.Router();
const { Comment, thread } = require("../models");

//Get all comments for a thread
