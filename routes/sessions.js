const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  const { email, password } = req.body.user;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error("User could not be found");
      }

      if (user.password !== password) {
        throw new Error("Could not authenticate user");
      }

      return User.findById(user._id)
        .populate({
          path: "boards",
          populate: {
            path: "lists",
            populate: {
              path: "cards"
            }
          }
        })
        .then(user => {
          let token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWTSECRET,
            {
              expiresIn: "1min"
            }
          );
          res.json({ token, user });
        });

      // let isPasswordValid = user.validatePassword(password);
      // if (!isPasswordValid) {
      //   throw new Error("Could not authenticate user");
      // }
    })
    .catch(error => {
      next(error);
    });
});

router.post("/signup", (req, res, next) => {
  const { user } = req.body;
  if (user.fullName && user.email && user.password) {
    User.create(user)
      .then(user => {
        let token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWTSECRET,
          {
            expiresIn: "1min"
          }
        );
        res.json({ token, user });
      })
      .catch(next);
  } else {
    res.json({ error: "All fields have to be filled" });
  }
});

router.get("/user", (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.state(401).json({ message: "Must pass a token" });
  }
  jwt.verify(token, process.env.JWTSECRET, function(err, user) {
    if (err) throw err;
    return User.findById(
      {
        _id: user._id
      },
      function(err, user) {
        if (err) throw err;
        res.json({ user, token });
      }
    );
  });
});

module.exports = router;
