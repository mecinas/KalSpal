export function reducer(state, action) {
    if (action.type === "ERROR") {
        return { ...state, errors: state.errors.concat(action.value) };
    } else if (action.type === "SET_WORKOUTS") {
        return { ...state, workouts: action.value };
    } else if (action.type === "SET_ACCESSTOKEN") {
        return { ...state, accesstoken: action.value };
    } else if (action.type === "SET_ISLOGGEDIN") {
        return { ...state, isLoggedIn: action.value };
    } else if (action.type === "SET_USER") {
        return { ...state, user: action.value };
    } else if (action.type === "SET_SELECTEDUSER") {
        return { ...state, selecteduser: action.value };
    }else if (action.type === "SET_SELECTEDFRIEND") {
        return { ...state, selectedfriend: action.value };
    }else if (action.type === "SET_ALLUSERS") {
        return { ...state, allusers: action.value };
    }
    return state;
}
