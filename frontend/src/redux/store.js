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
  posts: [{
    "id": "1",
    "title": "Poranna przejażdżka",
    "desc": "Tak się przejechałem",
    "comments": [{"user": "Adam", "text": "Super trasa"}, {"user": "Janusz", "text": "Sprzedam Opla"}],
    "likes": 37,
    "gpx": "GPXDATA"
  },{
    "id": "2",
    "title": "Inna trasa",
    "desc": "Nowy rower :)",
    "comments": [{"user": "Basia", "text": "Fajny rower!"}],
    "likes": 37,
    "gpx": "GPXDATA"
  }],
  friends: [{
    "id": "2137",
    "firstName": "Jan",
    "lastName": "Kowalski",
  }, {
    "id": "1004",
    "firstName": "Adam",
    "lastName": "Nowak",
  }
  ]
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
