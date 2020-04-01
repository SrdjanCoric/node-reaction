import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARDS_SUCCESS:
      return action.boards;
    case types.CREATE_BOARD_SUCCESS:
      const newBoard = action.board;
      return state.concat(newBoard);
    case types.FETCH_BOARD_SUCCESS:
      const excludedBoards = state.filter(
        board => board._id !== action.board._id
      );
      const { lists, ...newBoardWithoutLists } = action.board;

      return excludedBoards.concat(newBoardWithoutLists);
    default:
      return state;
  }
}
