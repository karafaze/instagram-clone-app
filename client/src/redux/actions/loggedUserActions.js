import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

export const GET_LOGGED_USER_DATA = "GET_LOGGED_USER_DATA";
export const GET_LOGGED_USER_FAILURE = "GET_LOGGED_USER_FAILURE";

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
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getLoggedUserFailure());
                return;
            }
            const { userId, token } = items;
            const response = await fetch(`/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            dispatch(getLoggedUserData(data.data));
        } catch (err) {
            dispatch(getLoggedUserFailure());
        }
    };
}
