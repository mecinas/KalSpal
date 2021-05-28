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

function postAvatar(dispatch, url, token, data) {
    fetch(url, {
            method: 'POST',
            headers: {"Authorization": `Bearer ${token}`},
            body: data
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function patchUser(dispatch, url, token, data) {
    fetch(url, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function deleteUser(dispatch, url, token) {
    fetch(url, {
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${token}`},
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

export function deleteWorkout(token, id) {
    return (dispatch) => {
      fetch(path + '/api/workout/' + id, {
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${token}`},
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
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

export function addAvatar(token, data) {
    return (dispatch) => {
      postAvatar(
        dispatch,
        path + '/api/avatar/',
        token,
        data
      );
    };
}

export function updateUser(token, data) {
    return (dispatch) => {
      patchUser(
        dispatch,
        path + '/api/user/',
        token,
        data
      );
    };
}

export function removeUser(token) {
    return (dispatch) => {
      deleteUser(
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