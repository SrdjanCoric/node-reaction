const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const Comment = require("../models/comment");
const Action = require("../models/action");
const User = require("../models/user");
const parseCardChange = require("../helpers/helpers");

router.post("/login", (req, res, next) => {
  const { user } = req.body;
  return User.findOne({ email: user.email }).then(userDb => {
    if (!userDb) {
      throw new Error("Could not find user");
    } else if (userDb.password !== user.password) {
      throw new Error("Invalid Password");
    }
    return User.findById(userDb._id)
      .populate({
        path: "boards",
        populate: {
          path: "lists",
          populate: {
            path: "cards"
          }
        }
      })
      .then(data => {
        res.json(data);
      })
      .catch(error => next(error));
  });
});

router.post("/signup", (req, res, next) => {
  const { user } = req.body;
  if (user.fullName && user.email && user.password) {
    User.create(user)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "All fields have to be filled" });
  }
});

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
  const { title, position } = req.body;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("List doesn't exist");
      }

      return List.findByIdAndUpdate(
        listId,
        {
          title: title || list.title,
          position: position || list.position
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
  const { listId, card } = req.body;
  let { title, position, copyFrom, keep } = card;
  let copyCard = {};
  let newCard;
  let boardId;
  List.findById(listId)
    .populate("board")
    .then(list => {
      if (!list) {
        throw new Error("List deosn't exist");
      }

      boardId = list.boardId;
      if (copyFrom) {
        Card.findById(copyFrom).then(card => {
          copyCard = card;
        });
      }

      return Card.create({
        labels: copyCard.labels || [],
        dueDate: copyCard.dueDate || null,
        title: copyCard.title || title,
        description: copyCard.description,
        listId: copyCard.listId || listId,
        boardId: copyCard.boardId || boardId,
        archived: false,
        position: position,
        comments: keep ? copyCard.comments : [],
        actions: copyCard.actions || []
      });
    })
    .then(result => {
      newCard = result;
      return List.findByIdAndUpdate(listId, {
        $addToSet: { cards: newCard._id }
      });
    })
    .then(() => {
      return Action.create({
        description: "Card was created",
        cardId: newCard._id
      });
    })
    .then(action => {
      return Card.findByIdAndUpdate(
        newCard._id,
        {
          $push: { actions: action._id }
        },
        { new: true }
      ).populate(["actions"]);
    })
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
      },
      {
        path: "actions"
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

      let actionMessage = parseCardChange(attrs, card);

      if (actionMessage) {
        return Action.create({
          description: actionMessage,
          cardId: cardId
        });
      }
    })
    .then(action => {
      if (action) {
        return Card.findByIdAndUpdate(
          cardId,
          {
            ...attrs,
            $push: { actions: action._id }
          },
          { new: true }
        ).populate(["actions"]);
      } else {
        return Card.findByIdAndUpdate(
          cardId,
          {
            ...attrs
          },
          { new: true }
        ).populate(["actions"]);
      }
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

router.delete("/cards/:id", (req, res, next) => {
  const cardId = req.params.id;
  let deletedCard;

  Card.findById(cardId)
    .populate({
      path: "list",
      populate: {
        path: "board"
      }
    })
    .then(card => {
      if (!card) {
        throw new Error("Card doesn't exist");
      }

      return Card.findByIdAndRemove(cardId);
    })
    .then(result => {
      deletedCard = result;
      return List.updateOne(
        { cards: { $in: [deletedCard._id] } },
        {
          $pull: { cards: deletedCard._id }
        }
      );
    })
    .then(() => {
      res.json({
        card: deletedCard
      });
    })
    .catch(error => next(error));
});

module.exports = router;
