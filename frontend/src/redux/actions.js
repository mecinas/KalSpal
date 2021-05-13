const path = 'https://app-kalspal-dev.azurewebsites.net'

function fetchWorkouts(dispatch, url, token) {
    fetch(url, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => 
            res.json())
        .then((json) => {
            dispatch(setWorkouts(json));
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function fetchUser(dispatch, url, token) {
    fetch(url, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => 
            res.json())
        .then((json) => {
            dispatch(setUser(json));
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

export function getWorkouts(token) {
    return (dispatch) => {
      fetchWorkouts(
        dispatch,
        path + '/api/workout/',
        token
      );
    };
}

export function getUser(token) {
    return (dispatch) => {
      fetchUser(
        dispatch,
        path + '/api/user/',
        token
      );
    };
}


function setWorkouts(workouts) {
    return {
        type: "SET_WORKOUTS",
        value: workouts
    };
}

function setUser(user) {
    return {
        type: "SET_USER",
        value: user
    };
}

export function setAccessToken(token) {
    return {
        type: "SET_ACCESSTOKEN",
        value: token
    };
}

export function setIsLoggedIn(val) {
    return {
        type: "SET_ISLOGGEDIN",
        value: val
    };
}

export function setSelectedUser(user) {
    return {
        type: "SET_SELECTEDUSER",
        value: user
    };
}

export function setSelectedFriend(user) {
    return {
        type: "SET_SELECTEDFRIEND",
        value: user
    };
}