export default function user(state = false, action) {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return true;
    case "FETCH_USER_SUCCESS":
      return false;
    case "INVALID_USER":
      return false;
    case "FETCH_BOARDS_REQUEST":
      return true;
    case "FETCH_BOARDS_SUCCESS":
      return false;
  }
  return state;
}
