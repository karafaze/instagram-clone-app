import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';

import "./usersocial.scss";

export default function UserSocial() {
    const location = useLocation()
    const userData = useSelector(state => state.profile.userData);
    return (
        <React.Fragment>
            <div className="stats--single">
                <span>{userData?.postsLength || 0}</span>
                <p>Posts</p>
            </div>
            <Link 
                to={`${location.pathname}/follow`}
                className="stats--single"
            >
                <span>{userData?.followedByLength || 0}</span>
                <p>Followers</p>
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
