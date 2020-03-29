const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.findUser = (req, res, next) => {
  const userId = req.userData.userId;
  User.findById(userId)
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
      req.user = user;
      next();
    });
};

exports.findByEmail = (req, res, next) => {
  const { email, password } = req.body.user;
  User.findOne({ email }).then(user => {
    if (!user) {
      throw new Error("User could not be found");
    }

    if (user.password !== password) {
      throw new Error("Could not authenticate user");
    }
    req.userData = { userId: user._id };
    next();
  });
};

exports.createToken = (req, res, next) => {
  const user = req.user;
  let token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWTSECRET,
    {
      expiresIn: "5min"
    }
  );
  req.token = token;
  next();
};

exports.sendUser = (req, res, next) => {
  const token = req.token || req.headers.authorization;
  const user = req.user;
  res.json({ token, user });
};

exports.createUser = (req, res, next) => {
  const { user } = req.body;
  if (user.fullName && user.email && user.password) {
    User.create(user).then(user => {
      req.user = user;
      next();
    });
  } else {
    res.json({ error: "All fields have to be filled" });
  }
};
