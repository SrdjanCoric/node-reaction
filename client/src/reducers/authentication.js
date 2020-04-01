import * as types from "../constants/ActionTypes";

let user = localStorage.getItem("user");
user = JSON.parse(user);
let token = localStorage.getItem("jwtToken");
const initialState = user
  ? { token, user, isLoggedIn: true }
  : { isLoggedIn: false };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true
      };
    case types.LOGOUT_SUCCESS:
      return { isLoggedIn: false };
    case types.SIGNUP_SUCCESS:
      return {
        token: action.payload.token,
        user: action.payload.user,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
