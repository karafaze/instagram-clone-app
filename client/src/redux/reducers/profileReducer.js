import * as actions from "../actions/profileActions";

export const initialState = {
    userData: {},
    isLoading: true,
    hasError: false,
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PROFILE:
            return {
                ...state,
            };
        case actions.GET_PROFILE_DATA:
            return {
                userData: action.payload,
                isLoading: false,
                hasError: false,
            };
        case actions.GET_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
}
