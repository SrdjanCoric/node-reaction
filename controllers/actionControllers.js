const Action = require("../models/action");
const { parseCardChange } = require("../helpers/helpers");

exports.createAction = (req, res, next) => {
  const card = req.card;
  const { attrs } = req.body;
  if (attrs) {
    let actionMessage = parseCardChange(attrs, card);
    if (actionMessage) {
      Action.create({
        description: actionMessage,
        cardId: card._id
      }).then(action => {
        req.action = action;
        next();
      });
    } else {
      next();
    }
  } else {
    Action.create({
      description: "Card was created",
      cardId: card._id
    }).then(action => {
      req.action = action;
      next();
    });
  }
};
