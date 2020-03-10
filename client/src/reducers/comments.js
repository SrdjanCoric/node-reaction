export default function comments(state = [], action) {
  switch (action.type) {
    case "FETCH_CARD_SUCCESS":
      const comments = action.payload.card.comments.reduce((acc, comment) => {
        return acc.concat(comment);
      }, []);
      return comments;
    case "CREATE_COMMENT_SUCCESS":
      return state.concat(action.payload.comment);
    default:
      return state;
  }
}
