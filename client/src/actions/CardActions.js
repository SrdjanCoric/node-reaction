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

export function createCard(listId, card, callback) {
  return function(dispatch) {
    dispatch(createCardRequest);
    apiClient.createCard(listId, card, data => {
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

export function updateCard(cardId, attrs, callback) {
  return function(dispatch) {
    dispatch(updateCardRequest());
    apiClient.updateCard(cardId, attrs, data => {
      dispatch(updateCardSuccess(data.card));
      if (callback) callback(data.card);
    });
  };
}

export function deleteCard(cardId, callback) {
  return function(dispatch) {
    dispatch(deleteCardRequest());
    apiClient.deleteCard(cardId, data => {
      dispatch(deleteCardSuccess(data.card._id));
      if (callback) callback();
    });
  };
}
