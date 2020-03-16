import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(error, errorResponse) {
  error();
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
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(token, board, callback) {
    // let config = {
    //   Authorization: "Bearer " + token,
    //   body: { board }
    // };
    return axios
      .post(routes.CREATE_BOARD_URL, { board })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(token, id, callback) {
    // let config = {
    //   Authorization: "Bearer " + token
    // };
    return axios
      .get(routes.getBoardUrl(id))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(token, boardId, title, position, callback) {
    // let config = {
    //   Authorization: "Bearer " + token,
    //   body: { boardId, title, position }
    // };
    return axios
      .post(routes.CREATE_LIST_URL, { boardId, title, position })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(token, listId, list, callback) {
    // let config = {
    //   Authorization: "Bearer " + token,
    //   body: { list }
    // };
    return axios
      .put(routes.updateListUrl(listId), { list })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(token, listId, card, callback) {
    // let config = {
    //   Authorization: "Bearer " + token,
    //   body: { listId, card }
    // };
    return axios
      .post(routes.CREATE_CARD_URL, { listId, card })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getCard: function(token, id, callback) {
    // let config = {
    //   Authorization: "Bearer " + token
    // };
    return axios
      .get(routes.getCardUrl(id))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateCard: function(token, cardId, attrs, callback) {
    // let config = {
    //   Authorization: "Bearer " + token,
    //   body: { attrs }
    // };
    return axios
      .put(routes.updateCardUrl(cardId), { attrs })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  deleteCard: function(token, cardId, callback) {
    // let config = {
    //   Authorization: "Bearer " + token
    // };
    return axios
      .delete(routes.deleteCardUrl(cardId))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createComment: function(token, cardId, text, callback) {
    // let config = {
    //   Authorization: "Bearer " + token,
    //   body: { cardId, text }
    // };
    return axios
      .post(routes.CREATE_COMMENT_URL, { cardId, text })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  login: function(user, callback) {
    return axios
      .post(routes.LOGIN, { user })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
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
      .catch(res => logError(error, res));
  }
};

export default apiClient;
