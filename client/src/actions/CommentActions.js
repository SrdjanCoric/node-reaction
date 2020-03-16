import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCommentRequest() {
  return { type: types.CREATE_COMMENT_REQUEST };
}

export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, payload: { comment } };
}

export function createComment(token, cardId, text, callback) {
  return function(dispatch) {
    dispatch(createCommentRequest());
    apiClient.createComment(token, cardId, text, data => {
      dispatch(createCommentSuccess(data.newComment));
      if (callback) callback(data.newComment);
    });
  };
}
