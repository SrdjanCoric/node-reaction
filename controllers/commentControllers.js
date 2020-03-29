const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
  const { text, cardId } = req.body;
  return Comment.create({
    text: text || "New Comment",
    cardId: cardId
  }).then(comment => {
    req.comment = comment;
    next();
  });
};
exports.sendComment = (req, res, next) => {
  const comment = req.comment;
  res.json({ comment });
};
