const Board = require("../models/board");

exports.getBoards = (req, res, next) => {
  const userId = req.userData.userId;

  Board.find({
    userId,
  }).then((boards) => {
    req.boards = boards;
    next();
  });
};

exports.createBoard = (req, res, next) => {
  const userId = req.userData.userId;
  if (req.body.board.title) {
    Board.create({ title: req.body.board.title, userId }).then((board) => {
      req.board = board;
      next();
    });
  } else {
    res.json({ error: "The input field is empty" });
  }
};

exports.getBoard = (req, res, next) => {
  const boardId = req.params.id;
  const userId = req.userData.userId;
  Board.findOne({ _id: boardId, userId })
    .populate({ path: "lists", populate: { path: "cards" } })
    .then((board) => {
      if (!board) {
        throw new Error("Board doesn't exist");
      }
      req.board = board;
      next();
    })
    .catch((err) => next(err));
};

exports.findBoard = (req, res, next) => {
  const userId = req.userData.userId;
  const { boardId } = req.body;
  Board.findOne({ _id: boardId, userId }).then((board) => {
    if (!board) {
      throw new Error("Board doesn't exist");
    }
    req.board = board;
    next();
  });
};

exports.addListToBoard = (req, res, next) => {
  const list = req.list;
  const boardId = req.board._id;
  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id }, // adds list to the lists array in board
  }).then(() => {
    next();
  });
};

exports.sendBoard = (req, res, next) => {
  const board = req.board;
  res.json(board);
};

exports.sendBoards = (req, res, next) => {
  const boards = req.boards;
  res.json(boards);
};
