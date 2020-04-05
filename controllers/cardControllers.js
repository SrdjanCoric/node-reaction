const Card = require("../models/card");

exports.createCard = (req, res, next) => {
  let { title, position, copyFrom, keep } = req.body.card;
  const list = req.list;
  const listId = list._id;
  const boardId = list.boardId;
  let copyCard = {};
  if (copyFrom) {
    Card.findById(copyFrom).then((card) => {
      copyCard = card;
      Card.create({
        labels: copyCard.labels,
        dueDate: copyCard.dueDate,
        title: copyCard.title,
        description: copyCard.description,
        listId: listId,
        boardId: boardId,
        archived: false,
        position: position,
        comments: keep ? copyCard.comments : [],
        actions: copyCard.actions,
      }).then((card) => {
        req.card = card;
        next();
      });
    });
  } else {
    return Card.create({
      labels: [],
      dueDate: null,
      title: title,
      description: "",
      listId: listId,
      boardId: boardId,
      archived: false,
      position: position,
      comments: [],
      actions: [],
    }).then((card) => {
      req.card = card;
      next();
    });
  }
};

exports.updateCard = (req, res, next) => {
  const action = req.action;
  const card = req.card;
  const { attrs } = req.body;
  if (action) {
    Card.findByIdAndUpdate(
      card._id,
      {
        ...attrs,
        $push: { actions: action._id },
      },
      { new: true }
    )
      .populate(["actions"])
      .then((card) => {
        req.card = card;
        next();
      });
  } else {
    Card.findByIdAndUpdate(
      card._id,
      {
        ...attrs,
      },
      { new: true }
    )
      .populate(["actions"])
      .then((card) => {
        req.card = card;
        next();
      });
  }
};

exports.cardBelongsToUser = (req, res, next) => {
  const user = req.user;
  const card = req.card;
  if (
    !user.boards.some((boardId) => String(boardId) === String(card.boardId))
  ) {
    throw new Error("You are not allowed to do that");
  }
  next();
};

exports.findCard = (req, res, next) => {
  const cardId = req.params.id || req.body.cardId;
  Card.findById(cardId)
    .populate([
      {
        path: "list",
        populate: {
          path: "board",
        },
      },
      {
        path: "comments",
      },
      {
        path: "actions",
      },
    ])
    .then((card) => {
      if (!card) {
        throw new Error("Card doesn't exist");
      }
      req.card = card;
      next();
    });
};

exports.sendCard = (req, res) => {
  const card = req.card;
  res.json({
    card,
  });
};

exports.addCommentToCards = (req, res, next) => {
  const cardId = req.card.id;
  const comment = req.comment;
  Card.findByIdAndUpdate(cardId, {
    $addToSet: { comments: comment._id },
  }).then(() => {
    next();
  });
};

exports.removeCard = (req, res, next) => {
  Card.findByIdAndRemove(req.card._id).then(() => next());
};
