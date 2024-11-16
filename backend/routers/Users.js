const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");
const { sign } = require("jsonwebtoken");

//Creating an account
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

//Logging into an account
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User doesn't exist!" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) return res.json({ error: "Password is wrong!" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "nrQaoHnpKNNi1izsQZrBhdAZU"
    );
    return res.json({
      token: accessToken,
      username: username,
      id: user.id,
    });
  });
});

router.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll(); // Sequelize method to fetch all records
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

router.get("/", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
