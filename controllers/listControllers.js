const List = require("../models/list");

exports.findList = (req, res, next) => {
  const listId = req.body.listId || req.params.id;

  const user = req.user;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("List doesn't exist");
      }
      if (
        !user.boards.some(board => {
          return String(board._id) === String(list.boardId);
        })
      ) {
        throw new Error("You are not allowed to do that");
      }
      req.list = list;
      next();
    });
};

exports.updateList = (req, res, next) => {
  const list = req.list;
  const { title, position } = req.body.list;

  List.findByIdAndUpdate(
    listId,
    {
      title: title || list.title,
      position: position || list.position
    },
    { new: true }
  )
    .populate({
      path: "cards"
    })
    .then(updatedList => {
      req.list = updatedList;
      next();
    });
};

exports.addCardToList = (req, res, next) => {
  const card = req.card;
  const listId = req.list._id;
  List.findByIdAndUpdate(listId, {
    $addToSet: { cards: card._id }
  }).then(() => next());
};

exports.createList = (req, res, next) => {
  const { title, boardId, position } = req.body;
  List.create({
    title: title || "New List",
    position: position || 65535,
    cards: [],
    boardId: boardId
  }).then(list => {
    req.list = list;
    next();
  });
};

exports.sendList = (req, res) => {
  let list = req.list;
  res.json({ list });
};

exports.removeCardFromList = (req, res, next) => {
  const card = req.card;
  List.updateOne(
    { cards: { $in: [card._id] } },
    {
      $pull: { cards: card._id }
    }
  ).then(() => next());
};
