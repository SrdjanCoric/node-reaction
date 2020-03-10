import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, payload: { card } };
}

export function fetchCardRequest() {
  return { type: types.FETCH_CARD_REQUEST };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, payload: { card } };
}

export function createCard(listId, title, callback) {
  return function(dispatch) {
    dispatch(createCardRequest);
    apiClient.createCard(listId, title, data => {
      dispatch(createCardSuccess(data.newCard));
      if (callback) {
        callback(data.newCard);
      }
    });
  };
}

export function fetchCard(id) {
  return function(dispatch) {
    dispatch(fetchCardRequest());
    apiClient.getCard(id, data => {
      dispatch(fetchCardSuccess(data.card));
    });
  };
}
