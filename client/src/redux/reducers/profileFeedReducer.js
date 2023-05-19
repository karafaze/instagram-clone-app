import * as actions from "../actions/profileFeedActions";

export const initialState = {
    isLoading: true,
    feedData: [],
    hasError: false,
};

export default function profileFeedReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_PROFILE_FEED:
            return {
                ...state,
                isLoading: true,
            };
        case actions.GET_PROFILE_FEED_DATA:
            // we receive an array of unique user object in action.payload
            // initialize empty array of updates
            let newFeedData = []
            // we iterate over stateFeedData if not empty
            if (state.feedData.length > 0){
                // for each new user in action.payload
                // we check if he's not already in state
                for (let actionUser of action.payload){
                    let isInState = state.feedData.find(stateUser => {
                        return stateUser.userId === actionUser.userId
                    })
                    // if he's not in state, we add it to updateArray
                    if (!isInState){
                        newFeedData.push(actionUser)
                    }
                }
                // and finally we update stateFeedData by merging two arrays
                return {
                    isLoading: false,
                    feedData: [...state.feedData, ...newFeedData],
                    hasError: false,
                };
            } else {
                // if stateFeedData is empty, we just add action.payload
                return {
                    isLoading: false,
                    feedData: action.payload,
                    hasError: false,
                };
            }
        case actions.GET_PROFILE_FEED_FAILURE:
            return {
                ...state,
                hasError: true,
            };
        default:
            return state;
    }
}
