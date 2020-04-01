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

export function updateCardRequest() {
  return { type: types.UPDATE_CARD_REQUEST };
}

export function updateCardSuccess(card) {
  return { type: types.UPDATE_CARD_SUCCESS, payload: { card } };
}

export function deleteCardRequest() {
  return { type: types.DELETE_CARD_REQUEST };
}

export function deleteCardSuccess(cardId) {
  return { type: types.DELETE_CARD_SUCCESS, payload: { cardId } };
}

export function createCard(token, listId, card, callback) {
  return function(dispatch) {
    dispatch(createCardRequest);
    apiClient.createCard(token, listId, card, data => {
      dispatch(createCardSuccess(data.card));
      if (callback) {
        callback(data.card);
      }
    });
  };
}

export function fetchCard(token, id) {
  return function(dispatch) {
    dispatch(fetchCardRequest());
    apiClient.getCard(token, id, data => {
      dispatch(fetchCardSuccess(data.card));
    });
  };
}

export function updateCard(token, cardId, attrs, callback) {
  return function(dispatch) {
    dispatch(updateCardRequest());
    apiClient.updateCard(token, cardId, attrs, data => {
      dispatch(updateCardSuccess(data.card));
      if (callback) callback(data.card);
    });
  };
}

export function deleteCard(token, cardId, callback) {
  return function(dispatch) {
    dispatch(deleteCardRequest());
    apiClient.deleteCard(token, cardId, data => {
      dispatch(deleteCardSuccess(data.card._id));
      if (callback) callback();
    });
  };
}
