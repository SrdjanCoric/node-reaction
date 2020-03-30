export default function user(state = {}, action) {
  if (action.type === "FETCH_USER_SUCCESS") {
    const user = action.payload.user;
    return {
      user
    };
  }
  return state;
}
