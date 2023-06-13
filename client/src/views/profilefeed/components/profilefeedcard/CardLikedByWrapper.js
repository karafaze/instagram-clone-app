import React from "react";
import { useSelector } from "react-redux";

import CardLikedByOne from "./CardLikedByOne";
import CardLikedByTwo from "./CardLikedByTwo";
import CardLikedByMore from "./CardLikedByMore";

export default function CardLikedByWrapper({ likes, users }) {
	// retrieve all user profiles that liked a picture from the current visited profile
    const userLikesInState = useSelector((state) => state.profilePost.data.likes);
	// retrieve the loggedUserData
    const loggedUser = useSelector((state) => state.loggedUser.userData);
	// get Boolean to indicate whether logged user liked this specific post
    const loggedUserIn = likes.includes(loggedUser.userId)
	// filter userLikesInState and get only the data from the users that liked this specific post
    const userLikes = userLikesInState.filter(user => likes.includes(user.userId))

    if (userLikes.length === 1) {
		return <CardLikedByOne likes={userLikes} loggedUserIn={loggedUserIn}/>
    } else if (userLikes.length === 2) {
		return <CardLikedByTwo likes={userLikes} loggedUserIn={loggedUserIn} loggedUser={loggedUser}/>
    } else {
		return <CardLikedByMore likes={userLikes} loggedUserIn={loggedUserIn} loggedUser={loggedUser}/>
    }
}
