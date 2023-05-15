import * as actions from "../actions/profilePostAction";

export const initialState = {
    data: [],
    isLoading: true,
    hasError: false,
};

export default function profilePostReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PROFILE_POST:
            return { ...state };
        case actions.GET_PROFILE_POST_DATA:
            return {
                data: action.payload,
                isLoading: false,
                hasError: false,
            };
        case actions.UPDATE_PROFILE_POST_LIKE:
            const newData = state.data.map((post) => {
                return post._id === action.payload._id
                    ? { ...action.payload }
                    : post;
            });
            return {
                data: newData,
                isLoading: false,
                hasError: false,
            };
        case actions.GET_PROFILE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return { ...state };
    }
}
