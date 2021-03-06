const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
    comments: 1,
  });
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      error: "username must be unique",
    });
  }

  if (username.length < 3) {
    return res.status(400).json({
      error: "username must be longer than 3 characters",
    });
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: "password must be longer than 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = userRouter;
