import * as actions from "../actions/randomUserActions";

export const initialState = {
    userData: {},
    isLoading: true,
    hasError: false,
};

export default function randomUserReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_RANDOM_USER:
            return {
                ...state,
            };
        case actions.GET_RANDOM_USER_DATA:
            return {
                userData: action.payload,
                isLoading: false,
                hasError: false,
            };
        case actions.GET_RANDOM_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
}
