export default function actionsReducer(state = [], action) {
  if (action.type === "FETCH_CARD_SUCCESS") {
    const actions = action.payload.card.actions;
    const filteredActions = state.filter(
      a => a.cardId !== action.payload.card._id
    );

    return filteredActions.concat(actions);
  } else if (action.type === "UPDATE_CARD_SUCCESS") {
    const actions = action.payload.card.actions;
    const filteredActions = state.filter(
      a => a.cardId !== action.payload.card._id
    );

    return filteredActions.concat(actions);
  }
  return state;
}
