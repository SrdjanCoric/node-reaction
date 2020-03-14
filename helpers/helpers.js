const isDueDateAdded = (attrs, card) => {
  if (!card.dueDate && attrs.dueDate) {
    return true;
  }
  return false;
};

const isDueDateRemoved = (attrs, card) => {
  if (card.dueDate && !attrs.dueDate && attrs.dueDate !== undefined) {
    return true;
  }
  return false;
};

const isSentBackToBoard = (attrs, card) => {
  if (card.archived && !attrs.archived) {
    return true;
  }
  return false;
};

const isDueDateChanged = (attrs, card) => {
  if (+card.dueDate !== +attrs.dueDate && attrs.dueDate !== undefined) {
    return true;
  }
  return false;
};

const isCompletedChanged = (attrs, card) => {
  if (card.completed !== attrs.completed && attrs.completed !== undefined) {
    return true;
  }
  return false;
};

const isArchived = (attrs, card) => {
  if (!card.archived && attrs.archived) {
    return true;
  }
  return false;
};

const isListChanged = (attrs, card) => {
  if (card.listId !== attrs.listId && attrs.listId) {
    return true;
  }
  return false;
};

const parseCardChange = (attrs, card) => {
  if (isDueDateAdded(attrs, card)) {
    return "Due date was added";
  } else if (isDueDateRemoved(attrs, card)) {
    return "Due date was removed";
  } else if (isDueDateChanged(attrs, card)) {
    return "Due date was changed";
  } else if (isCompletedChanged(attrs, card)) {
    return "Completion status was changed";
  } else if (isArchived(attrs, card)) {
    return "Card was archived";
  } else if (isListChanged(attrs, card)) {
    return "Card was moved to a different list";
  } else if (isSentBackToBoard(attrs, card)) {
    return "Card was sent back to the board from the archive";
  } else {
    return null;
  }
};

module.exports = parseCardChange;
