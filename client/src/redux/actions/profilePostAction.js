import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_PROFILE_POST = "GET_PROFILE_POST";
export const GET_PROFILE_POST_DATA = "GET_PROFILE_POST_DATA";
export const GET_PROFILE_POST_FAILURE = "GET_PROFILE_POST_FAILURE";

export const getProfilePost = () => {
    return {
        type: GET_PROFILE_POST_DATA,
    };
};

export const getProfilePostData = (data) => {
    return {
        type: GET_PROFILE_POST_DATA,
        payload: data,
    };
};

export const getProfilePostFailure = () => {
    return {
        type: GET_PROFILE_POST_FAILURE,
    };
};

export function fetchProfilePostData(userId) {
    console.log('fetching profile post data')
    return async (dispatch) => {
        dispatch(getProfilePost());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfilePostFailure());
                return;
            }
            const { token } = items;
            const response = await fetch(
                `/posts/${userId}/all`,
                getAuthorizationHeader(token)
            );
            const data = await response.json();
            if (data.status == "OK") {
                dispatch(getProfilePostData(data.data));
            } else if (data.status == "FAILED") {
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            dispatch(getProfilePostFailure());
        }
    };
}
