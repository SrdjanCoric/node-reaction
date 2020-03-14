const parseCardChange = attrs => {
  if (attrs.dueDate) {
    return "Due date was changed";
  } else if (attrs.completed) {
    return "Completion status was changed";
  } else if (attrs.archived) {
    return "Card was archived";
  } else if (attrs.listId) {
    return "Card was moved to a different list";
  } else {
    return false;
  }
};

module.exports = parseCardChange;
