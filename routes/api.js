const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const boardControllers = require("../controllers/boardControllers");
const userControllers = require("../controllers/userControllers");
const listControllers = require("../controllers/listControllers");
const cardControllers = require("../controllers/cardControllers");
const actionControllers = require("../controllers/actionControllers");
const commentControllers = require("../controllers/commentControllers");

router.use(checkAuth);

router.get("/boards", boardControllers.getBoards, boardControllers.sendBoards);

router.post(
  "/boards",
  boardControllers.createBoard,
  userControllers.addBoardToUser,
  boardControllers.sendBoard
);

router.get(
  "/boards/:id",
  boardControllers.getBoard,
  boardControllers.sendBoard
);

router.post(
  "/lists",
  boardControllers.findBoard,
  listControllers.createList,
  boardControllers.addListToBoard,
  listControllers.sendList
);

router.put(
  "/lists/:id",
  userControllers.findUser,
  listControllers.findList,
  listControllers.updateList,
  listControllers.sendList
);

router.post(
  "/cards",
  userControllers.findUser,
  listControllers.findList,
  cardControllers.createCard,
  listControllers.addCardToList,
  actionControllers.createAction,
  cardControllers.updateCard,
  cardControllers.sendCard
);

router.get(
  "/cards/:id",
  userControllers.findUser,
  cardControllers.findCard,
  cardControllers.cardBelongsToUser,
  cardControllers.sendCard
);

router.put(
  "/cards/:id",
  userControllers.findUser,
  cardControllers.findCard,
  cardControllers.cardBelongsToUser,
  actionControllers.createAction,
  cardControllers.updateCard,
  cardControllers.sendCard
);

router.post(
  "/comments",
  userControllers.findUser,
  cardControllers.cardBelongsToUser,
  cardControllers.findCard,
  commentControllers.createComment,
  cardControllers.addCommentToCards,
  commentControllers.sendComment
);

router.delete(
  "/cards/:id",
  cardControllers.findCard,
  cardControllers.removeCard,
  listControllers.removeCardFromList,
  cardControllers.sendCard
);

module.exports = router;
