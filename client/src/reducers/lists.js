const lists = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      const { lists, ...newBoardWithoutLists } = action.board;

      let listsWithoutCards = lists.map(list => {
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });
      let filteredLists = state.filter(
        list => list.boardId !== action.board._id
      );
      return filteredLists.concat(listsWithoutCards);
    case "CREATE_LIST_SUCCESS":
      return state.concat(action.payload.list);
    case "UPDATE_LIST_TITLE_SUCCESS":
      return state.map(list => {
        if (list._id === action.payload.listId) {
          return Object.assign({}, list, {
            title: action.payload.newList.title
          });
        } else {
          return list;
        }
      });
    default:
      return state;
  }
};

export default lists;
