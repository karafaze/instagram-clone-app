import {
    getItemsFromLocalStorage,
} from "../../utils/localStorageToken";

export const GET_PROFILE_FEED = "GET_PROFILE_FEED";
export const GET_PROFILE_FEED_DATA = "GET_PROFILE_FEED_DATA";
export const GET_PROFILE_FEED_FAILURE = "GET_PROFILE_FEED_FAILURE";

export const getProfileFeed = () => {
    return {
        type: GET_PROFILE_FEED,
    };
};

export const getProfileFeedData = (data) => {
    return {
        type: GET_PROFILE_FEED_DATA,
        payload: data,
    };
};

export const getProfileFeedFailure = () => {
    return {
        type: GET_PROFILE_FEED_FAILURE,
    };
};

export function fetchMultipleUserData(userIdList) {
    return async (dispatch) => {
        dispatch(getProfileFeed());
        try {
            const items = getItemsFromLocalStorage();
            if (!items.token){
                dispatch(getProfileFeedFailure());
                return;
            }
            const urls = userIdList.map(userId => {
                return fetch(`/user/profilefeed/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${items.token}`,
                    }
                })
            })
            Promise.all(urls)
                .then(responses => {
                    return Promise.all(responses.map(res => res.json()))
                })
                .then(result => {
                    // if all good, result is an Array of objects, 
                    // each object has status: OK and a data prop with intel
                    // we first iterate over result and retrieve users
                    const users = result.map(obj => obj.data)
                    dispatch(getProfileFeedData(users))
                })
        } catch (err) {
            dispatch(getProfileFeedFailure());
        }
    };
}
