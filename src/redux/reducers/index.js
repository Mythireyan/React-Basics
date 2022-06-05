import { combineReducers } from "redux";
import { usersList } from "./users";

const rootReducer = combineReducers({
  usersList,
});

export default rootReducer;
