import axios from "axios";
import * as routes from "../constants/ApiRoutes";
import { clearStorage } from "../utils/helpers";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response.status === 401) {
    clearStorage();
  }

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
  getBoards: function(token, callback, error) {
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios
      .get(routes.BOARDS_INDEX_URL, config)
      .then(unwrapData)
      .then(callback)
      .catch(res => logError(res, error));
  },
  createBoard: function(token, board, callback) {
    let config = {
      method: "POST",
      url: routes.CREATE_BOARD_URL,
      data: { board },
      headers: { Authorization: token }
    };
    return axios(config)
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
    let config = {
      method: "POST",
      url: routes.CREATE_LIST_URL,
      data: { boardId, title, position },
      headers: { Authorization: token }
    };
    return axios(config)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(token, listId, list, callback) {
    let config = {
      method: "PUT",
      url: routes.updateListUrl(listId),
      data: { list },
      headers: { Authorization: token }
    };
    return axios(config)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(token, listId, card, callback) {
    let config = {
      method: "POST",
      url: routes.CREATE_CARD_URL,
      data: { listId, card },
      headers: { Authorization: token }
    };
    return axios(config)
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
    let config = {
      method: "PUT",
      url: routes.updateCardUrl(cardId),
      data: { attrs },
      headers: { Authorization: token }
    };
    return axios(config)
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
    let config = {
      method: "POST",
      url: routes.CREATE_COMMENT_URL,
      data: { cardId, text },
      headers: { Authorization: token }
    };
    return axios(config)
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
