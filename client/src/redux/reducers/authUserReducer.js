import * as actions from "../actions/authUserActions";

export const initialState = {
    userData: {},
    isLoading: true,
    hasError: false,
};

export default function authUserReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_AUTH_USER:
            return {
                ...state,
            };
        case actions.GET_AUTH_USER_DATA:
            return {
                userData: action.payload,
                isLoading: false,
                hasError: false,
            };
        case actions.GET_AUTH_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
}
