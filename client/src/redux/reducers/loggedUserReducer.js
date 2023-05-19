import * as actions from "../actions/loggedUserActions";

export const initialState = {
    userData: {},
    isLoading: true,
    hasError: false,
};

export default function loggedUserReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_LOGGED_USER_DATA:
            return {
                userData: action.payload,
                isLoading: false,
                hasError: false,
            };
        case actions.GET_LOGGED_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
}
