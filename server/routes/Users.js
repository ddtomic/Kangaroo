const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const isAdmin = Users.findAll({ where: { access: "Admin" } }).then(
      (response) => {
        console.log(response);
        if (response.length >= 1) {
          console.log("This is a User account!");
          Users.create({
            username: username,
            email: email,
            password: hash,
          });
          res.json("Success!");
        } else {
          console.log("This is an Admin account!");
          Users.create({
            username: username,
            email: email,
            password: hash,
            access: "Admin",
          });
          res.json("Success!");
        }
      }
    );
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User doesn't exist!" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) return res.json({ error: "Password is wrong!" });

    const accessToken = sign(
      { username: user.username, id: user.id, access: user.access },
      "nrQaoHnpKNNi1izsQZrBhdAZU"
    );
    return res.json({
      token: accessToken,
      username: username,
      id: user.id,
      access: user.access,
    });
  });
});

router.get("/", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
