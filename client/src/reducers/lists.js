const lists = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BOARD_SUCCESS":
      const { lists, ...newBoardWithoutLists } = action.board;

      let listsWithoutCards = lists.map(list => {
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });
      let filteredLists = state.filter(
        list => list.board_id !== action.board.id
      );
      return filteredLists.concat(listsWithoutCards);
    default:
      return state;
  }
};

export default lists;