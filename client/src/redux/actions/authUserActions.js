import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_AUTH_USER = "GET_AUTH_USER";
export const GET_AUTH_USER_DATA = "GET_AUTH_USER_DATA";
export const GET_AUTH_USER_FAILURE = "GET_AUTH_USER_FAILURE";

export const getAuthUser = () => {
    return {
        type: GET_AUTH_USER,
    };
};

export const getAuthUserData = (data) => {
    return {
        type: GET_AUTH_USER_DATA,
        payload: data,
    };
};

export const getAuthUserFailure = () => {
    return {
        type: GET_AUTH_USER_FAILURE,
    };
};

export function fetchAuthUserDetails(userId) {
    return async (dispatch) => {
        dispatch(getAuthUser());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getAuthUserFailure());
                return;
            };
            const {userId, token} = items;
            const response = await fetch(
                `/user/${userId}`,
                getAuthorizationHeader(token)
            );
            const data = await response.json();
            dispatch(getAuthUserData(data.data));
        } catch (err) {
            dispatch(getAuthUserFailure());
        }
    };
}
