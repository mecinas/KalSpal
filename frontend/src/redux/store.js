import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";

const initialState = {
  isLoggedIn: localStorage.getItem("isLogged"),
  errors: [],
  workouts: [],
  registered: sessionStorage.getItem("isRegistered"),
  accesstoken: undefined,
  user: undefined,
  selecteduser: undefined,
  selectedfriend: undefined,
  allusers: undefined,
  posts: [],
  notifications: [],
  friends: [],
  comments: {},
  reactions: {},
  foundWorkout: {},
  workoutSummary: {}
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
