const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
        bio: bio,
      });
      res.json("Success!");
    });
  } catch (error) {
    res.status(500).send("Can't create user");
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll(); // Sequelize method to fetch all records
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

module.exports = router;
