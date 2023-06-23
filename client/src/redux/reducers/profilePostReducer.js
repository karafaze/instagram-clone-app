import * as actions from "../actions/profilePostAction";

export const initialState = {
    data: {
        posts: [],
        likes: [],
		comments: [],
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
                    likes: [...state.data.likes],
					comments: [...state.data.comments],
                },
             };
        case actions.GET_PROFILE_POST_DATA:
            return {
                data: {
                    posts: action.payload.posts,
                    likes: action.payload.likes,
					comments: action.payload.comments,
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
                    likes: [...state.data.likes],
					comments: [...state.data.comments],
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
