const Board = require("../models/board");

exports.getBoards = (req, res) => {
  const userId = req.userData.userId;

  return Board.find({
    userId
  }).then(data => res.json(data));
};

exports.createBoard = (req, res, next) => {
  const userId = req.userData.userId;
  if (req.body.board.title) {
    Board.create({ title: req.body.board.title, userId })
      .then(result => {
        board = result;
        return User.findByIdAndUpdate(
          userId,
          {
            $addToSet: { boards: board }
          },
          { new: true }
        );
      })
      .then(_ => res.json(board))
      .catch(err => next(err));
  } else {
    res.json({ error: "The input field is empty" });
  }
};

exports.getBoard = (req, res, next) => {
  const boardId = req.params.id;
  const userId = req.userData.userId;
  Board.findOne({ _id: boardId, userId })
    .populate({ path: "lists", populate: { path: "cards" } })
    .then(board => {
      if (!board) {
        throw new Error("Board doesn't exist");
      }
      res.json({
        board
      });
    })
    .catch(err => next(err));
};

exports.findBoard = (req, res, next) => {
  const userId = req.userData.userId;
  const { boardId } = req.body;
  Board.findOne({ _id: boardId, userId }).then(board => {
    if (!board) {
      throw new Error("Board doesn't exist");
    }
    next();
  });
};

exports.updateBoard = (req, res, next) => {
  const list = req.list;
  Board.findByIdAndUpdate(boardId, {
    $addToSet: { lists: list._id } // adds list to the lists array in board
  });
};
