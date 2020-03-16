export default function user(state = false, action) {
  if (action.type === "FETCH_USER_REQUEST") {
    return true;
  } else if (action.type === "FETCH_USER_SUCCESS") {
    return false;
  } else if (action.type === "INVALID_USER") {
    return false;
  }
  return state;
}
