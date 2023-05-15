import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_DATA = "GET_PROFILE_DATA";
export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";

export const getProfile = () => {
    return {
        type: GET_PROFILE,
    };
};

export const getProfileData = (data) => {
    return {
        type: GET_PROFILE_DATA,
        payload: data,
    };
};

export const getProfileFailure = () => {
    return {
        type: GET_PROFILE_FAILURE,
    };
};

export const fetchProfileDetails = (userId) => {
    return async (dispatch) => {
        dispatch(getProfile());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfileFailure());
                return;
            }
            const { token } = items;
            const response = await fetch(
                `/user/${userId}`,
                getAuthorizationHeader(token)
            );
            const data = await response.json();
            if (data.status === "FAILED") {
                dispatch(getProfileFailure());
            }
            if (data.status === "OK") {
                dispatch(getProfileData(data.data));
            }
        } catch (err) {
            console.log(err);
            dispatch(getProfileFailure());
        }
    };
};

export const updateProfileFollow = (profileUserId, loggedUserId) => {
    return async (dispatch) => {
        dispatch(getProfile());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfileFailure());
            }
            const payload = {
                profileUserId,
                loggedUserId,
            };
            const response = await fetch(`/user/${profileUserId}/follow`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": `Bearer ${items.token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(getProfileData(data.data));
            }
        } catch (error) {
            dispatch(getProfileFailure());
        }
    };
};

export const updateProfileUnfollow = (profileUserId, loggedUserId) => {
    return async (dispatch) => {
        dispatch(getProfile());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfileFailure());
            }
            const payload = {
                profileUserId,
                loggedUserId,
            };
            const response = await fetch(`/user/${profileUserId}/unfollow`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${items.token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(getProfileData(data.data));
            }
        } catch (error) {
            dispatch(getProfileFailure());
        }
    };
};