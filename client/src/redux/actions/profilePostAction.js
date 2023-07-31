import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

export const GET_PROFILE_POST = "GET_PROFILE_POST";
export const GET_PROFILE_POST_DATA = "GET_PROFILE_POST_DATA";
export const GET_PROFILE_POST_FAILURE = "GET_PROFILE_POST_FAILURE";
export const UPDATE_PROFILE_POST_LIKE = "UPDATE_PROFILE_POST_LIKE";
export const UPDATE_PROFILE_POST_COMMENT = "UPDATE_PROFILE_POST_COMMENT";

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
        payload: data,
    };
};

export const getProfilePostFailure = () => {
    return {
        type: GET_PROFILE_POST_FAILURE,
    };
};

export const updateProfilePostComment = (data) => {
	return {
		type: UPDATE_PROFILE_POST_COMMENT,
		payload: data,
	}
}

// fetch actions

export function fetchProfilePostData(userId) {
    return async (dispatch) => {
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfilePostFailure());
                return;
            }
            const { token } = items;
            const response = await fetch(`/posts/${userId}/all`, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.status === "OK") {
                dispatch(getProfilePostData(data.data));
            } else if (data.status === "FAILED") {
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            dispatch(getProfilePostFailure());
        }
    };
}

export function addLikeToPost(userId, postId) {
    return async (dispatch) => {
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfilePostFailure());
                return;
            }
            const { token } = items;
            const response = await fetch(`/posts/${userId}/${postId}/like`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId, postId }),
            });
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(updateProfilePostLike(data.data));
                dispatch(fetchProfilePostData(data.data.owner));
            } else if (data.status === "FAILED") {
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            dispatch(getProfilePostFailure());
        }
    };
}

export function removeLikeFromPost(userId, postId) {
    return async (dispatch) => {
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfilePostFailure());
                return;
            }
            const { token } = items;
            const payload = { userId, postId };
            const response = await fetch(`/posts/${userId}/${postId}/unlike`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(updateProfilePostLike(data.data));
                dispatch(fetchProfilePostData(data.data.owner));
            } else if (data.status === "FAILED") {
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            dispatch(getProfilePostFailure());
        }
    };
}

export function addNewComment(postId, comment) {
	return async (dispatch) => {
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token) {
                dispatch(getProfilePostFailure());
                return;
            }
            const { token, userId } = items;
			const payload = {
				userId: userId,
				comment: comment
			}
            const response = await fetch(`/comments/${postId}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (data.status === "OK") {
				console.log(data.comment)
				dispatch(updateProfilePostComment(data.comment))
                // dispatch(updateProfilePostLike(data.data));
                // dispatch(fetchProfilePostData(data.data.owner));
            } else if (data.status === "FAILED") {
				console.log(data.data)
                dispatch(getProfilePostFailure());
            }
        } catch (err) {
            dispatch(getProfilePostFailure());
        }
	}
}
