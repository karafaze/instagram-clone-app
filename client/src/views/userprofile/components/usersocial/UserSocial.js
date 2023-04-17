import React from "react";
import { useSelector } from "react-redux";

import "./usersocial.scss";

export default function UserSocial() {
    const userData = useSelector(state => state.profile.userData);
    return (
        <React.Fragment>
            <div className="stats--single">
                <span>{userData?.postsLength || 0}</span>
                <p>Posts</p>
            </div>
            <div className="stats--single">
                <span>{userData?.followedByLength || 0}</span>
                <p>Followers</p>
            </div>
            <div className="stats--single">
                <span>{userData?.followingLength || 0}</span>
                <p>Following</p>
            </div>
        </React.Fragment>
    );
}
