import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, payload: { list } };
}

export function updateListRequest() {
  return { type: types.UPDATE_LIST_REQUEST };
}

export function updateListSuccess(listId, newList) {
  return {
    type: types.UPDATE_LIST_SUCCESS,
    payload: { listId, newList }
  };
}

export function createList(token, boardId, title, position, callback) {
  return function(dispatch) {
    dispatch(createListRequest());
    apiClient.createList(token, boardId, title, position, data => {
      console.log("list", data.list);
      dispatch(createListSuccess(data.list));
      if (callback) {
        callback(data.list);
      }
    });
  };
}

export function updateList(token, listId, list, callback) {
  return function(dispatch) {
    dispatch(updateListRequest());
    apiClient.updateList(token, listId, list, data => {
      dispatch(updateListSuccess(listId, data.list));
      if (callback) {
        callback(data.list);
      }
    });
  };
}
