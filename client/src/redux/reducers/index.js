import { combineReducers } from "redux";
import loggedUserReducer from "./loggedUserReducer";
import profileReducer from './profileReducer'
import loggedUserPostReducer from "./loggedUserPostReducer";
import profilePostReducer from './profilePostReducer';

const rootReducer = combineReducers({
    loggedUser: loggedUserReducer,
    profile: profileReducer,
    loggedUserPost: loggedUserPostReducer,
    profilePost: profilePostReducer,
});

export default rootReducer;