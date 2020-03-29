import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

export function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}

export function createBoardRequest() {
  return { type: types.CREATE_BOARD_REQUEST };
}

export function createBoardSuccess(board) {
  return { type: types.CREATE_BOARD_SUCCESS, board: board };
}

export function fetchBoardRequest() {
  return { type: types.FETCH_BOARD_REQUEST };
}

export function fetchBoardSuccess(board) {
  return { type: types.FETCH_BOARD_SUCCESS, board };
}

export function invalidUser() {
  return {
    type: "INVALID_USER"
  };
}

export function fetchBoards(token) {
  return function(dispatch) {
    dispatch(fetchBoardsRequest());
    apiClient.getBoards(
      token,
      boards => {
        dispatch(fetchBoardsSuccess(boards));
      },
      () => {
        dispatch(invalidUser());
      }
    );
  };
}

export function createBoard(token, board, callback) {
  return function(dispatch) {
    dispatch(createBoardRequest());
    apiClient.createBoard(token, board, newBoard => {
      dispatch(createBoardSuccess(newBoard));

      if (callback) {
        callback(newBoard);
      }
    });
  };
}

export function fetchBoard(token, id, callback) {
  return function(dispatch) {
    dispatch(fetchBoardRequest());
    apiClient.getBoard(
      token,
      id,
      board => {
        dispatch(fetchBoardSuccess(board));
        if (callback) {
          callback(board);
        }
      },
      () => {
        dispatch(invalidUser());
      }
    );
  };
}
