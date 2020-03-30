import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";
import { clearStorage } from "../utils/helpers";

export function loginRequest() {
  return { type: types.LOGIN_REQUEST };
}

export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { token: data.token, user: data.user }
  };
}

export function signUpRequest() {
  return { type: types.SIGNUP_REQUEST };
}

export function signUpSuccess(data) {
  return {
    type: types.SIGNUP_SUCCESS,

    payload: { token: data.token, user: data.user }
  };
}

export function fetchUserRequest() {
  return { type: "FETCH_USER_REQUEST" };
}

export function fetchUserSuccess(data) {
  return {
    type: "FETCH_USER_SUCCESS",

    payload: { token: data.token, user: data.user }
  };
}

export function logoutSuccess() {
  return {
    type: "LOGOUT_SUCCESS"
  };
}

export function login(user, callback) {
  return function(dispatch) {
    dispatch(loginRequest());
    apiClient.login(user, data => {
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("user", data.user);
      dispatch(loginSuccess(data));
      if (callback) callback();
    });
  };
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutSuccess());
    clearStorage();
  };
}

export function signup(user, callback) {
  return function(dispatch) {
    dispatch(signUpRequest());
    apiClient.signup(user, data => {
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("user", data.user);
      dispatch(signUpSuccess(data));
      if (callback) callback();
    });
  };
}

export function fetchUser(token) {
  return function(dispatch) {
    dispatch(fetchUserRequest());
    apiClient.fetchUser(token, data => {
      if (data.token) {
        dispatch(fetchUserSuccess(data));
      } else {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }
    });
  };
}
