import * as actions from "../actions/loggedUserPostAction";

export const initialState = {
    data: {},
    isLoading: true,
    hasError: false,
};

export default function loggedUserPostReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_LOGGED_USER_POST:
            return state;
        case actions.GET_LOGGED_USER_POST_DATA:
            return {
                data: action.payload,
                isLoading: false,
                hasError: false,
            };
        case actions.GET_LOGGED_USER_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
}
