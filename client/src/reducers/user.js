export default function user(
  state = { isLoggedIn: false, invalidUser: false },
  action
) {
  if (action.type === "LOGIN_SUCCESS") {
    const user = action.payload.user;
    console.log("in login success", user);
    return {
      fullName: user.fullName,
      isLoggedIn: true,
      token: action.payload.token,
      invalidUser: false
    };
  } else if (action.type === "SIGNUP_SUCCESS") {
    const user = action.payload.user;
    return {
      fullName: user.fullName,
      isLoggedIn: true,
      token: action.payload.token,
      invalidUser: false
    };
  } else if (action.type === "FETCH_USER_SUCCESS") {
    const user = action.payload.user;
    const token = action.payload.token;
    return {
      fullName: user.fullName,
      isLoggedIn: true,
      token: token,
      invalidUser: false
    };
  } else if (action.type === "INVALID_USER") {
    return {
      invalidUser: true
    };
  }
  return state;
}
