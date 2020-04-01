import * as types from "../constants/ActionTypes";

export default function actions(state = [], action) {
  if (action.type === types.FETCH_CARD_SUCCESS) {
    const actions = action.payload.card.actions;
    const filteredActions = state.filter(
      a => a.cardId !== action.payload.card._id
    );

    return filteredActions.concat(actions);
  } else if (action.type === types.UPDATE_CARD_SUCCESS) {
    const actions = action.payload.card.actions;
    const filteredActions = state.filter(
      a => a.cardId !== action.payload.card._id
    );

    return filteredActions.concat(actions);
  }
  return state;
}
