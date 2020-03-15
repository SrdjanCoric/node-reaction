import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function loginRequest() {
  return { type: types.LOGIN_REQUEST };
}

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, payload: { user } };
}

export function login(user, callback) {
  return function(dispatch) {
    dispatch(loginRequest());
    apiClient.login(user, userDb => {
      dispatch(loginSuccess(userDb));
      if (callback) callback();
    });
  };
}

export function signUpRequest() {
  return { type: types.SIGNUP_REQUEST };
}

export function signUpSuccess(user) {
  return { type: types.SIGNUP_SUCCESS, payload: { user } };
}

export function signup(user, callback) {
  return function(dispatch) {
    dispatch(signUpRequest());
    apiClient.signup(user, userDb => {
      dispatch(signUpSuccess(userDb));
      if (callback) callback();
    });
  };
}
