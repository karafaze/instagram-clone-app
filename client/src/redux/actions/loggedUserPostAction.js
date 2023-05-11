import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_LOGGED_USER_POST = "GET_LOGGED_USER_POST";
export const GET_LOGGED_USER_POST_DATA = "GET_LOGGED_USER_POST_DATA";
export const GET_LOGGED_USER_POST_FAILURE = "GET_LOGGED_USER_POST_FAILURE";

export const getLoggedUserPost = () => {
    return {
        type: GET_LOGGED_USER_POST_DATA,
    };
};

export const getLoggedUserPostData = (data) => {
    return {
        type: GET_LOGGED_USER_POST_DATA,
        payload: data,
    };
};

export const getLoggedUserPostFailure = () => {
    return {
        type: GET_LOGGED_USER_POST_FAILURE,
    };
};

export function fetchLoggedUserPostData() {
    return async (dispatch) => {
        dispatch(getLoggedUserPost());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getLoggedUserPostFailure());
                return;
            }
            const { token, userId } = items;
            const response = await fetch(
                `/posts/${userId}/all`,
                getAuthorizationHeader(token)
            );
            const data = await response.json();
            if (data.status == "OK") {
                dispatch(getLoggedUserPostData(data.data));
            } else if (data.status == "FAILED") {
                dispatch(getLoggedUserPostFailure());
            }
        } catch (err) {
            dispatch(getLoggedUserPostFailure());
        }
    };
}
