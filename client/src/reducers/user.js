export default function user(state = { isLoggedIn: false }, action) {
  if (action.type === "LOGIN_SUCCESS") {
    const user = action.payload.user;
    return {
      username: user.username,
      fullName: user.fullName,
      isLoggedIn: true
    };
  } else if (action.type === "SIGNUP_SUCCESS") {
    const user = action.payload.user;
    console.log("in reducer", user);
    return {
      username: user.username,
      fullName: user.fullName,
      isLoggedIn: true
    };
  }
  return state;
}
