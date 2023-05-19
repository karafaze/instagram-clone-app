import { combineReducers } from "redux";
import loggedUserReducer from "./loggedUserReducer";
import profileReducer from './profileReducer'
import loggedUserPostReducer from "./loggedUserPostReducer";
import profilePostReducer from './profilePostReducer';
// import profileFeedReducer from './profileFeedReducer';

const rootReducer = combineReducers({
    loggedUser: loggedUserReducer,
    profile: profileReducer,
    loggedUserPost: loggedUserPostReducer,
    profilePost: profilePostReducer,
    // profileFeedData: profileFeedReducer,
});

export default rootReducer;