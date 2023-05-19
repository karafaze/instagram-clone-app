
// function below is not usefull as it complexify the code when being used
// since what is returned from localStorage may not exists :
// (if localStorage is cleared and we still try to get to a userprofile page )
// !!!! NEED TO DO AGAIN
// used in authUserActions.js, randomUserActions, AuthGard.js, UserProfile.js
export function getItemsFromLocalStorage() {
    // retrieve items from the localStorage and returns them
    const items = JSON.parse(localStorage.getItem('photowall-user'))
    if (!items) return {}
    return { userId: items.userId, token: items.token };
}

export function getAuthorizationHeader(token) {
    // takes token as parameter
    // returns authorization Header for fetch call
    return {
        headers: {
            "Content-Type": "application/json;charset=utf-8 ",
            "Authorization": `Bearer ${token}`,
        },
    };
}
