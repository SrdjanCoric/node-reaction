exports.createCard = (req, res, next) => {
  let { title, position, copyFrom, keep } = card;
  const list = req.list;
  const listId = list._id;
  const boardId = list.boardId;
  if (copyFrom) {
    Card.findById(copyFrom).then(card => {
      copyCard = card;
    });
  }

  Card.create({
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
  }).then(card => {
    req.card = card;
    next();
  });
};

exports.updateCard = (req, res, next) => {
  const action = req.action;
  const newCard = req.card;
  if (action) {
    Card.findByIdAndUpdate(
      newCard._id,
      {
        $push: { actions: action._id }
      },
      { new: true }
    )
      .populate(["actions"])
      .then(card => {
        req.card = card;
        next();
      });
  } else {
    Card.findByIdAndUpdate(
      cardId,
      {
        ...attrs
      },
      { new: true }
    )
      .populate(["actions"])
      .then(card => {
        req.card = card;
        next();
      });
  }
};

exports.cardBelongsToUser = (req, res, next) => {
  const user = req.user;
  const cardId = req.params.id;
  let cards = user.boards.reduce((cards, board) => {
    const { lists, boardWithoutLists } = board;
    let cardsToAdd = lists.reduce((listCards, list) => {
      const { cards, listWithoutCards } = list;
      return listCards.concat(cards);
    }, []);
    return cards.concat(cardsToAdd);
  }, []);
  if (!cards.some(card => String(card._id) === String(cardId))) {
    throw new Error("You are not allowed to do that");
  }
  next();
};

exports.findCard = (req, res, next) => {
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
      req.card = card;
      next();
    });
};

exports.sendCard = (req, res) => {
  const card = req.card;
  res.json({
    card
  });
};

exports.addCommentToCards = (req, res, next) => {
  const cardId = req.card.id;
  Card.findByIdAndUpdate(cardId, {
    $addToSet: { comments: result._id }
  }).then(() => {
    next();
  });
};

exports.removeCard = (req, res, next) => {
  Card.findByIdAndRemove(req.card._id).then(() => next());
};
