import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import randomUserReducer from './randomUserReducer'

const rootReducer = combineReducers({
    authUser: authUserReducer,
    randomUser: randomUserReducer,
});

export default rootReducer;
