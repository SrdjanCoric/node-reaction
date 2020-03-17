import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse, error) {
  if (error) {
    error();
  }

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
  getBoards: function(token, callback) {
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios
      .get(routes.BOARDS_INDEX_URL, config)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(token, board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, { board, token })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(token, id, callback, error) {
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios
      .get(routes.getBoardUrl(id), config)
      .then(unwrapData)
      .then(callback)
      .catch(res => logError(res, error));
  },
  createList: function(token, boardId, title, position, callback) {
    return axios
      .post(routes.CREATE_LIST_URL, { boardId, title, position, token })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(token, listId, list, callback) {
    return axios
      .put(routes.updateListUrl(listId), { list, token })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(token, listId, card, callback) {
    return axios
      .post(routes.CREATE_CARD_URL, { listId, card, token })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getCard: function(token, id, callback, error) {
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios
      .get(routes.getCardUrl(id), config)
      .then(unwrapData)
      .then(callback)
      .catch(res => logError(res, error));
  },
  updateCard: function(token, cardId, attrs, callback) {
    return axios
      .put(routes.updateCardUrl(cardId), { attrs, token })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  deleteCard: function(token, cardId, callback) {
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios
      .delete(routes.deleteCardUrl(cardId), config)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createComment: function(token, cardId, text, callback) {
    return axios
      .post(routes.CREATE_COMMENT_URL, { cardId, text, token })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  login: function(user, callback, error) {
    return axios
      .post(routes.LOGIN, { user })
      .then(unwrapData)
      .then(callback)
      .catch(res => logError(res, error));
  },
  signup: function(user, callback) {
    return axios
      .post(routes.SIGNUP, { user })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  fetchUser: function(token, callback, error) {
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios
      .get("/sessions/user", config)
      .then(unwrapData)
      .then(callback)
      .catch(res => logError(res, error));
  }
};

export default apiClient;
