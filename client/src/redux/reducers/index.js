import { combineReducers } from "redux";
import loggedUserReducer from "./loggedUserReducer";
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
    loggedUser: loggedUserReducer,
    profile: profileReducer,
});

export default rootReducer;
