import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProfileFollow } from "../../redux/actions/profileActions";

import "./follow.scss";

export default function Follow() {
    const userDetail = useSelector((state) => state.profile.userData);
    const loggedUser = useSelector((state) => state.loggedUser.userData);
    const dispatch = useDispatch();

    const isFollowing = userDetail?.followedBy?.includes(loggedUser.userId);

    const handleFollow = async () => {
        // we first disable the span button to prevent multiple calls
        let followBtn = document.querySelector('#follow')
        followBtn.classList.add('disabled-btn');
        if (isFollowing) {
            await dispatch(fetchProfileFollow(userDetail.userId, -1, loggedUser.userId))
            console.log('will unfollow')
        } else {
            await dispatch(fetchProfileFollow(userDetail.userId, 1, loggedUser.userId))
            console.log('will follow')
        }
        // when follow has been dealt with in the back-end
        // re-instate clicking option on span button
        followBtn.classList.remove('disabled-btn')
    };

    if (!userDetail || !loggedUser) return <p>Loading...</p>;
    return (
        <span id="follow" className="top--data__follow" onClick={handleFollow}>
            {isFollowing ? "unfollow" : "follow"}
        </span>
    );
}