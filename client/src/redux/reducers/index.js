import { combineReducers } from "redux";
import loggedUserReducer from "./loggedUserReducer";
import profileReducer from './profileReducer'
import profilePostReducer from './profilePostReducer';

const rootReducer = combineReducers({
    loggedUser: loggedUserReducer,
    profile: profileReducer,
    profilePost: profilePostReducer,
});

export default rootReducer;