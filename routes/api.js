const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");

router.get("/boards", (req, res, next) => {
  Board.find({}, "title")
    .then(data => res.json(data))
    .catch(next);
});

router.post("/boards", (req, res, next) => {
  if (req.body.title) {
    Board.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The input field is empty" });
  }
});

router.get("/boards/:id", (req, res, next) => {
  const boardId = req.params.id;
  Board.findById(boardId)
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
  // Board.findOne({"_id": req.params.id}).then(data => res.json(data)).catch(next);
});

router.post("/lists", (req, res, next) => {
  const { title, boardId } = req.body;
  console.log(req.body);
  let newList;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board doesn't exist");
      }

      return List.create({
        title: title || "New List",
        cards: [],
        board: boardId
      });
    })
    .then(result => {
      newList = result;
      return Board.findByIdAndUpdate(boardId, {
        $addToSet: { lists: result.id } // adds list to the lists array in board
      });
    })
    .then(() => {
      res.json({ newList });
    })
    .catch(err => next(err));
});

router.put("/lists/:id", (req, res, next) => {
  const listId = req.params.id;
  const { title } = req.body;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("List doesn't exist");
      }

      return List.findByIdAndUpdate(
        listId,
        {
          title: title || list.title
        },
        { new: true }
      ).populate({
        path: "cards"
      });
    })
    .then(result => {
      res.json({
        result
      });
    });
});

router.post("/cards", (req, res, next) => {
  const { title, listId } = req.body;
  let newCard;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("List deosn't exist");
      }

      return Card.create({
        title: title || "New Card",
        description: description || "Enter a description here",
        list: listId,
        archived: false
      });
    })
    .then(result => {
      newCard = result;
      return List.findByIdAndUpdate(listId, {
        $addToSet: { cards: result.id }
      });
    })
    .then(() => Card.findById(newCard.id))
    .then(result => {
      res.json({
        result
      });
    })
    .catch(error => next(error));
});

router.get("/:id", (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .populate([
      {
        path: "list",
        populate: {
          path: "board"
        }
      }
    ])
    .then(card => {
      if (!card) {
        throw new Error("Card doesn't exist");
      }

      res.json({
        card
      });
    })
    .catch(error => next(error));
});

module.exports = router;
