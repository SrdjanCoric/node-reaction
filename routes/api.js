const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const Comment = require("../models/comment");

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
});

router.post("/lists", (req, res, next) => {
  const { title, boardId, position } = req.body;
  let newList;
  Board.findById(boardId)
    .then(board => {
      if (!board) {
        throw new Error("Board doesn't exist");
      }

      return List.create({
        title: title || "New List",
        position: position || 65535,
        cards: [],
        boardId: boardId
      });
    })
    .then(result => {
      newList = result;
      return Board.findByIdAndUpdate(boardId, {
        $addToSet: { lists: result._id } // adds list to the lists array in board
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
    .then(updatedList => {
      res.json({
        updatedList
      });
    });
});

router.post("/cards", (req, res, next) => {
  const { title, listId, position } = req.body;
  let newCard;
  let boardId;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("List deosn't exist");
      }

      boardId = list.boardId;

      return Card.create({
        title: title || "New Card",
        description: "",
        listId: listId,
        boardId: boardId,
        archived: false,
        position: position || 65535
      });
    })
    .then(result => {
      newCard = result;
      return List.findByIdAndUpdate(listId, {
        $addToSet: { cards: result._id }
      });
    })
    .then(() => Card.findById(newCard._id))
    .then(newCard => {
      res.json({
        newCard
      });
    })
    .catch(error => next(error));
});

router.get("/cards/:id", (req, res, next) => {
  const cardId = req.params.id;

  Card.findById(cardId)
    .populate([
      {
        path: "list",
        populate: {
          path: "board"
        }
      },
      {
        path: "comments"
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

router.put("/cards/:id", (req, res, next) => {
  const cardId = req.params.id;
  const { attrs } = req.body;
  let originalCard;

  Card.findById(cardId)
    .populate({
      path: "list",
      populate: {
        path: "board"
      }
    })
    .then(card => {
      if (!card) {
        throw new Error("Card doesn't exist.");
      }

      originalCard = card;
      return Card.findByIdAndUpdate(
        cardId,
        {
          ...attrs
        },
        { new: true }
      );
    })
    .then(card => {
      res.json({
        card
      });
    })
    .catch(error => next(error));
});

router.post("/comments", (req, res, next) => {
  console.log(req.body);
  const { text, cardId } = req.body;
  let newComment;
  Card.findById(cardId)
    .then(card => {
      if (!card) {
        throw new Error("Card doesn't exist");
      }

      return Comment.create({
        text: text || "New Comment",
        cardId: cardId
      });
    })
    .then(result => {
      console.log(result);
      newComment = result;
      return Card.findByIdAndUpdate(cardId, {
        $addToSet: { comments: result._id }
      });
    })
    .then(() => {
      res.json({ newComment });
    })
    .catch(err => next(err));
});

module.exports = router;
