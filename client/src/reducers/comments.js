import * as types from "../constants/ActionTypes";

export default function comments(state = [], action) {
  switch (action.type) {
    case types.FETCH_CARD_SUCCESS:
      const comments = action.payload.card.comments.reduce((acc, comment) => {
        return acc.concat(comment);
      }, []);
      return comments;
    case types.CREATE_COMMENT_SUCCESS:
      return state.concat(action.payload.comment);
    default:
      return state;
  }
}
