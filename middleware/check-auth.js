const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error("Must pass a token");
    }
    token = token.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    req.userData = { userId: decodedToken._id };
    next();
  } catch (error) {
    error.status = 401;
    return next(error);
  }
};
