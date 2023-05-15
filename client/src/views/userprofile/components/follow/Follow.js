import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateProfileFollow, updateProfileUnfollow } from "../../../../redux/actions/profileActions";

import "./follow.scss";

export default function Follow() {
    const userData = useSelector((state) => state.profile.userData);
    const loggedUser = useSelector((state) => state.loggedUser.userData);
    const dispatch = useDispatch();

    const isFollowing = userData?.followedBy?.includes(loggedUser.userId)

    const handleFollow = async () => {
        // we first disable the span button to prevent multiple calls
        const followBtn = document.querySelector("#follow");
        followBtn.classList.add("disabled-btn");
        await new Promise((resolve) => {
            isFollowing
                ? resolve(dispatch(updateProfileUnfollow(userData.userId,loggedUser.userId)))
                : resolve((dispatch(updateProfileFollow(userData.userId,loggedUser.userId))))
        });
        // when follow actions have been dealt with in the back-end
        // re-instate clicking option on span button
        followBtn.classList.remove("disabled-btn");
    };

    if (!userData || !loggedUser) return <p>Loading...</p>;
    return (
        <span id="follow" className="top--data__follow" onClick={handleFollow}>
            {isFollowing ? "unfollow" : "follow"}
        </span>
    );
}
