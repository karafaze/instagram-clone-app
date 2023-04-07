import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_LOGGED_USER = "GET_LOGGED_USER";
export const GET_LOGGED_USER_DATA = "GET_LOGGED_USER_DATA";
export const GET_LOGGED_USER_FAILURE = "GET_LOGGED_USER_FAILURE";
// export const UPDATE_LOGGED_USER_DATA = "UPDATE_LOGGED_USER_DATA"

export const getLoggedUser = () => {
    return {
        type: GET_LOGGED_USER,
    };
};

export const getLoggedUserData = (data) => {
    return {
        type: GET_LOGGED_USER_DATA,
        payload: data,
    };
};

export const getLoggedUserFailure = () => {
    return {
        type: GET_LOGGED_USER_FAILURE,
    };
};

export function fetchLoggedUserDetails() {
    return async (dispatch) => {
        dispatch(getLoggedUser());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getLoggedUserFailure());
                return;
            };
            const {userId, token} = items;
            const response = await fetch(
                `/user/${userId}`,
                getAuthorizationHeader(token)
            );
            const data = await response.json();
            dispatch(getLoggedUserData(data.data));
        } catch (err) {
            dispatch(getLoggedUserFailure());
        }
    };
}
