import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, payload: { list } };
}

export function updateListTitleRequest() {
  return { type: types.UPDATE_LIST_TITLE_REQUEST };
}

export function updateListTitleSuccess(listId, newList) {
  return {
    type: types.UPDATE_LIST_TITLE_SUCCESS,
    payload: { listId, newList }
  };
}

export function createList(boardId, title, position, callback) {
  return function(dispatch) {
    dispatch(createListRequest());
    apiClient.createList(boardId, title, position, data => {
      dispatch(createListSuccess(data.newList));
      if (callback) {
        callback(data.newList);
      }
    });
  };
}

export function updateListTitle(listId, title, callback) {
  return function(dispatch) {
    dispatch(updateListTitleRequest());
    apiClient.updateListTitle(listId, title, data => {
      dispatch(updateListTitleSuccess(listId, data.updatedList));
      if (callback) {
        callback(data.updatedList);
      }
    });
  };
}
