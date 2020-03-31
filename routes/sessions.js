const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const userControllers = require("../controllers/userControllers");

router.post(
  "/login",
  userControllers.findByEmail,
  userControllers.findUser,
  userControllers.createToken,
  userControllers.sendUser
);

router.post(
  "/signup",
  userControllers.createUser,
  userControllers.createToken,
  userControllers.sendUser
);

module.exports = router;
