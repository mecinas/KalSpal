const path = 'https://app-kalspal-dev.azurewebsites.net'

//Ustandaryzowanie requestów

function fetchWorkouts(dispatch, url, token) {
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
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
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch(setUser(json));
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function fetchAllUsers(dispatch, url, token) {
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch({ type: "SET_ALLUSERS", value: json });
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function fetchPosts(dispatch, url, token) {
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch(setComments({}))
            dispatch(setReactions({}))
            dispatch(setPosts(json))
            for (const workout in json) {
                dispatch(getComments(token, json[workout].id))
                dispatch(getReactions(token, json[workout].id))
            }
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function fetchComments(dispatch, url, token, id) {
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch(addComments(json, id))
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function fetchReactions(dispatch, url, token, id) {
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch(addReactions(json, id))
        })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function fetchFriends(dispatch, url, token) {
    fetch(url, { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch(setFriends(json))
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

export function getPosts(token) {
    return (dispatch) => {
        fetchPosts(
            dispatch,
            path + '/api/workout/dashboard',
            token
        );
    };
}

export function getUserPosts(token, id) {
    return (dispatch) => {
        fetchPosts(
            dispatch,
            path + `/api/user/${id}/workouts`,
            token
        );
    };
}

export function getComments(token, id) {
    return (dispatch) => {
        fetchComments(
            dispatch,
            path + `/api/workout/${id}/comments`,
            token,
            id
        );
    };
}

export function getReactions(token, id) {
    return (dispatch) => {
        fetchReactions(
            dispatch,
            path + `/api/workout/${id}/reactions`,
            token,
            id
        );
    };
}

export function getFriends(token) {
    return (dispatch) => {
        fetchFriends(
            dispatch,
            path + '/api/friend/',
            token
        );
    };
}

export function updateReaction(token, id) {
    return (dispatch) => {
        postReaction(
            dispatch,
            path + `/api/workout/${id}/reactions`,
            token,
            id
        );
    };
}

export function getAllUsers(token) {
    return (dispatch) => {
        fetchAllUsers(
            dispatch,
            path + '/api/user/all/',
            token,
        );
    };
}

function postAvatar(dispatch, url, token, data) {
    fetch(url, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` },
        body: data
    })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function postReaction(dispatch, url, token, id) {
    fetch(url, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` }
    })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}



function postComment(dispatch, url, token, data) {
    fetch(url, {
        method: 'POST',
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
        headers: { "Authorization": `Bearer ${token}` },
    })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

function deleteComment(dispatch, url, token) {
    fetch(url, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` },
    })
        .catch((e) => {
            dispatch({ type: "ERROR", value: "Error connecting to API" });
        });
}

export function cleanRegistered() {
    return (dispatch) => {
        dispatch({type:"CLEAN_REGISTERED" , value: false});
    };
}


export function checkIfUserIsRegisetred(token) {
    return (dispatch) => {
        fetch(path + '/api/user/check/registration', {headers: { "Authorization": `Bearer ${token}` },})
        .then((res) =>
            res.json())
        .then((json) => {
            dispatch({type:"SET_REGISTERED" , value: json.message});
        })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function deleteWorkout(token, id) {
    return (dispatch) => {
        fetch(path + '/api/workout/' + id, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${token}` },
        })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}


export function addFriend(token, id) {
    var data = { user_id: id }
    return (dispatch) => {
        fetch(path + '/api/friend/invitation/send', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function createUser(token, data) {
    return (dispatch) => {
        fetch(path + '/api/user/', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function postChallange(token, id, content) {
    var data = { 
        invited: id,
        text: content
        }
    return (dispatch) => {
        fetch(path + '/api/challenge/', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function getFindWorkout(token, data) {
    return (dispatch) => {
        fetch(path + '/api/workout/find?' + new URLSearchParams(data), {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then((res) =>{
            console.log(res.status)
            if (res.status === 200){
                return res.json()
            } else {
                alert("Nie znaleziono trasy")
                return undefined
            }
        })
        .then((json) => {
            if (json !== undefined){
                dispatch(setFoundWorkout({}))
                dispatch(setFoundWorkout(json))
            }
        })
            .catch((e) => {
                console.log(e)
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function respondInvitation(token, id, response) {
    var data = { 
        invitation_id: id,
        action: response 
    }
    return (dispatch) => {
        fetch(path + '/api/friend/invitation/respond', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function getNotifications(token) {
    return (dispatch) => {
        fetch(path + '/api/notification/all', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) =>
                res.json())
            .then((json) => {
                dispatch({ type: "SET_NOTIFICATIONS", value: json})
            })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function getUserById(token, id) {
    return (dispatch) => {
        fetch(path + '/api/user/' + id, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) =>
                res.json())
            .then((json) => {
                json.birthDate = json.birthDate.slice(0, 10)
                dispatch({ type: "SET_SELECTEDUSER", value: json })
            })
            .catch((e) => {
                dispatch({ type: "ERROR", value: "Error connecting to API" });
            });
    };
}

export function deleteChallenge(token, id) {
    return (dispatch) => {
        fetch(path + '/api/challenge/' + id, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${token}` },
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

export function submitComment(token, data, id) {
    return (dispatch) => {
        postComment(
            dispatch,
            path + `/api/workout/${id}/comments`,
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

export function removeComment(token, postid, commentid) {
    return (dispatch) => {
        deleteComment(
            dispatch,
            path + `/api/workout/${postid}/comments/${commentid}`,
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
    user.birthDate = user.birthDate.slice(0, 10)
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

export function setSelectedFriend(user) {
    return {
        type: "SET_SELECTEDFRIEND",
        value: user
    };
}

export function setPosts(posts) {
    return {
        type: "SET_POSTS",
        value: posts
    };
}

export function setComments(comments) {
    return {
        type: "SET_COMMENTS",
        value: comments
    };
}

export function setFriends(friends) {
    return {
        type: "SET_FRIENDS",
        value: friends
    };
}

export function addComments(comments, post) {
    return {
        type: "ADD_COMMENTS",
        value: comments,
        post: post
    };
}

export function addReactions(reactions, post) {
    return {
        type: "ADD_REACTIONS",
        value: reactions,
        post: post
    };
}

export function setReactions(reactions) {
    return {
        type: "SET_REACTIONS",
        value: reactions
    };
}


export function setReaction(post) {
    return {
        type: "SET_REACTION",
        value: post
    };
}

export function setFoundWorkout(data) {
    return {
        type: "SET_FOUNDWORKOUT",
        value: data
    };
}