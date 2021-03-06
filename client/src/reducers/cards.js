import * as types from "../constants/ActionTypes";

const cards = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS:
      const lists = action.board.lists;
      const boardId = action.board._id;
      let cards = [];
      lists.forEach(list => (cards = cards.concat(list.cards)));
      const filteredState = state.filter(card => {
        return card.boardId !== boardId;
      });
      cards = cards.map(card => {
        const existingVersion = state.find(
          stateCard => card._id === stateCard._id
        );
        if (existingVersion) {
          return { ...existingVersion, ...card };
        } else {
          return card;
        }
      });
      return filteredState.concat(cards);
    case types.CREATE_CARD_SUCCESS:
      return state.concat(action.payload.card);
    case types.FETCH_CARD_SUCCESS:
      const excludedCards = state.filter(
        card => card._id !== action.payload.card._id
      );
      const card = action.payload.card;
      return excludedCards.concat(card);
    case types.UPDATE_CARD_SUCCESS:
      return state.map(card => {
        if (card._id === action.payload.card._id) return action.payload.card;
        else return card;
      });
    case types.DELETE_CARD_SUCCESS:
      return state.filter(card => {
        if (card._id !== action.payload.cardId) {
          return card;
        }
        return null;
      });
    default:
      return state;
  }
};

export default cards;
