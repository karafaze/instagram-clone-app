import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';

import "./usersocial.scss";

export default function UserSocial() {
    const location = useLocation()
    const userData = useSelector(state => state.profile.userData);
    const postLength = useSelector(state => state.profilePost?.data?.posts?.length) || 0
    return (
        <React.Fragment>
            <div className="stats--single">
                <span>{postLength}</span>
                <p>Posts</p>
            </div>
            <Link 
                to={`${location.pathname}/follow`}
                className="stats--single"
            >
                <span>{userData?.followedByLength || 0}</span>
                <p>Follower{userData?.followedByLength === 1 ? null : 's'}</p>
            </Link>
            <Link 
                to={`${location.pathname}/follow`}
                className="stats--single"
            >
                <span>{userData?.followingLength || 0}</span>
                <p>Following</p>
            </Link>
        </React.Fragment>
    );
}
