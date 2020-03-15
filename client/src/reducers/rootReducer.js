import { combineReducers } from "redux";
import boards from "./boards";
import lists from "./lists";
import cards from "./cards";
import comments from "./comments";
import actions from "./actions";
import user from "./user";

const rootReducer = combineReducers({
  boards,
  lists,
  cards,
  comments,
  actions,
  user
});

export default rootReducer;
