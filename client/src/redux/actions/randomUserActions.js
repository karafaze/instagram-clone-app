import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_RANDOM_USER = "GET_RANDOM_USER";
export const GET_RANDOM_USER_DATA = "GET_RANDOM_USER_DATA";
export const GET_RANDOM_USER_FAILURE = "GET_RANDOM_USER_FAILURE";

export const getRandomUser = () => {
    return {
        type: GET_RANDOM_USER,
    };
};

export const getRandomUserData = (data) => {
    return {
        type: GET_RANDOM_USER_DATA,
        payload: data,
    };
};

export const getRandomUserFailure = () => {
    return {
        type: GET_RANDOM_USER_FAILURE,
    };
};

export function fetchRandomUserDetails(userId) {
    return async (dispatch) => {
        dispatch(getRandomUser());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getRandomUserFailure());
                return;
            };
            const {userId, token} = items;
            const response = await fetch(
                `/user/${userId}`,
                getAuthorizationHeader(token)
            );
            const data = await response.json();
            dispatch(getRandomUserData(data.data));
        } catch (err) {
            dispatch(getRandomUserFailure());
        }
    };
}
