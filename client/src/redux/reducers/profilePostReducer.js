import * as actions from "../actions/profilePostAction";

export const initialState = {
    data: {
        posts: [],
        likes: [],
    },
    isLoading: true,
    hasError: false,
};

export default function profilePostReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PROFILE_POST:
            return {
                isLoading: true,
                hasError: false,
                data: {
                    posts: [...state.data.posts],
                    likes: [...state.data.likes]
                },
             };
        case actions.GET_PROFILE_POST_DATA:
            return {
                data: {
                    posts: action.payload.posts,
                    likes: action.payload.likes
                },
                isLoading: false,
                hasError: false,
            };
        case actions.UPDATE_PROFILE_POST_LIKE:
            const newPostData = state.data.posts?.map((post) => {
                return post._id === action.payload._id
                    ? { ...action.payload }
                    : post;
            });
            return {
                data: {
                    posts: newPostData,
                    likes: [...state.data.likes]
                },
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
