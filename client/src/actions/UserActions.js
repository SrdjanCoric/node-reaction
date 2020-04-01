import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";
import { clearStorage, populatedStorage } from "../utils/helpers";

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

export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

export function login(user, callback) {
  return function(dispatch) {
    dispatch(loginRequest());
    apiClient.login(user, data => {
      populatedStorage(data);
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
      populatedStorage(data);
      dispatch(signUpSuccess(data));
      if (callback) callback();
    });
  };
}
