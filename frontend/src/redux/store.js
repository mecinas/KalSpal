import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";

const initialState = {
  isLoggedIn: localStorage.getItem("isLogged"),
  errors: [],
  workouts: [],
  accesstoken: undefined,
  user: undefined,
  selecteduser: undefined,
  selectedfriend: undefined,
  allusers: undefined,
  posts: [],
  notifications: [],
  friends: [],
  comments: {},
  reactions: {}
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
