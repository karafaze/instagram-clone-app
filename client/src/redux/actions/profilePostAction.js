import {
    getAuthorizationHeader,
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_PROFILE_POST = "GET_PROFILE_POST";
export const GET_PROFILE_POST_DATA = "GET_PROFILE_POST_DATA";
export const GET_PROFILE_POST_FAILURE = "GET_PROFILE_POST_FAILURE";
export const UPDATE_PROFILE_POST_LIKE = "UPDATE_PROFILE_POST_LIKE";

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

export const updateProfilePostLike = (data) => {
    return {
        type: UPDATE_PROFILE_POST_LIKE,
        payload: data
    }
}

export const getProfilePostFailure = () => {
    return {
        type: GET_PROFILE_POST_FAILURE,
    };
};

export function fetchProfilePostData(userId) {
    return async (dispatch) => {
        console.log('fetching ')
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

export function addLikeToPost(userId, postId){
    return async(dispatch) => {
        // dispatch(getProfilePost())
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token){
                dispatch(getProfilePostFailure());
                return;
            }
            const { token } = items;
            const response = await fetch(
                `/posts/${userId}/${postId}/like`, {
                    method:'PUT', 
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({userId, postId})
                }
            );
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(updateProfilePostLike(data.data))
            } else if (data.status === "FAILED") {
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            console.log(err)
            dispatch(getProfilePostFailure());
        }
        }
}

export function removeLikeFromPost(userId, postId){
    return async(dispatch) => {
        // dispatch(getProfilePost())
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token){
                dispatch(getProfilePostFailure());
                return;
            }
            const { token } = items;
            const payload = {userId, postId}
            const response = await fetch(
                `/posts/${userId}/${postId}/unlike`, {
                    method:'PUT', 
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(updateProfilePostLike(data.data));
            } else if (data.status === "FAILED") {
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            console.log(err)
            dispatch(getProfilePostFailure());
        }
        }
}