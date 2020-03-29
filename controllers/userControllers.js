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
