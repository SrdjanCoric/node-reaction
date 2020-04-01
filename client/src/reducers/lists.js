import * as types from "../constants/ActionTypes";

const lists = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS:
      const { lists } = action.board;

      let listsWithoutCards = lists.map(list => {
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });
      let filteredLists = state.filter(
        list => list.boardId !== action.board._id
      );
      return filteredLists.concat(listsWithoutCards);
    case types.CREATE_LIST_SUCCESS:
      return state.concat(action.payload.list);
    case types.UPDATE_LIST_SUCCESS:
      return state.map(list => {
        if (list._id === action.payload.listId) {
          return Object.assign({}, list, {
            title: action.payload.newList.title,
            position: action.payload.newList.position
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
