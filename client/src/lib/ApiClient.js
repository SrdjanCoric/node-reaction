import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function(callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, board)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(id, callback) {
    return axios
      .get(routes.getBoardUrl(id))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(boardId, title, position, callback) {
    return axios
      .post(routes.CREATE_LIST_URL, {
        boardId,
        title,
        position
      })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(listId, list, callback) {
    return axios
      .put(routes.updateListUrl(listId), list)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(listId, card, callback) {
    return axios
      .post(routes.CREATE_CARD_URL, { listId, card })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getCard: function(id, callback) {
    return axios
      .get(routes.getCardUrl(id))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateCard: function(cardId, attrs, callback) {
    return axios
      .put(routes.updateCardUrl(cardId), { attrs })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  deleteCard: function(cardId, callback) {
    console.log(cardId);
    return axios
      .delete(routes.deleteCardUrl(cardId))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createComment: function(cardId, text, callback) {
    return axios
      .post(routes.CREATE_COMMENT_URL, { cardId, text })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  }
};

export default apiClient;
