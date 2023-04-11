import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProfileFollow } from "../../redux/actions/profileActions";

import "./follow.scss";

export default function Follow() {
    const userDetail = useSelector((state) => state.profile.userData);
    const loggedUser = useSelector((state) => state.loggedUser.userData);
    const dispatch = useDispatch();

    const isFollowing = userDetail?.followedBy?.includes(loggedUser.userId);

    const handleFollow = () => {
        if (isFollowing) {
            dispatch(fetchProfileFollow(userDetail.userId, -1, loggedUser.userId))
            console.log('will unfollow')
        } else {
            dispatch(fetchProfileFollow(userDetail.userId, 1, loggedUser.userId))
            console.log('will follow')
        }
    };

    if (!userDetail || !loggedUser) return <p>Loading...</p>;
    return (
        <span className="top--data__follow" onClick={handleFollow}>
            {isFollowing ? "unfollow" : "follow"}
        </span>
    );
}