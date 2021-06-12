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
    } else if (action.type === "SET_SELECTEDFRIEND") {
        return { ...state, selectedfriend: action.value };
    } else if (action.type === "SET_ALLUSERS") {
        return { ...state, allusers: action.value };
    } else if (action.type === "SET_POSTS") {
        return { ...state, posts: action.value };
    } else if (action.type === "SET_COMMENTS") {
        return { ...state, comments: action.value };
    } else if (action.type === "SET_REACTIONS") {
        return { ...state, reactions: action.value };
    } else if (action.type === "ADD_COMMENTS") {
        return { ...state, comments: { ...state.comments, [action.post]: action.value } };
    } else if (action.type === "ADD_REACTIONS") {
        return { ...state, reactions: { ...state.reactions, [action.post]: action.value } };
    } else if (action.type === "SET_FRIENDS") {
        return { ...state, friends: action.value };
    } else if (action.type === "SET_NOTIFICATIONS") {
        return { ...state, notifications: action.value };
    } else if (action.type === "SET_REGISTERED") {
        return { ...state, registered: action.value };
    } else if (action.type === "CLEAN_REGISTERED") {
        return { ...state, registered: action.value };
    } else if (action.type === "SET_FOUNDWORKOUT") {
        return { ...state, foundWorkout: action.value };
    } else if (action.type === "SET_WORKOUTSUMMARY") {
        return { ...state, workoutSummary: action.value };
    }
    return state;
}
