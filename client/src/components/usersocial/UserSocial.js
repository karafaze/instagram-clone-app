import React from "react";
import { useSelector } from "react-redux";
import "./usersocial.scss";

export default function UserSocial({ isAuthenticatedUser }) {
    const userDetail = useSelector((state) =>
        isAuthenticatedUser ? state.authUser : state.randomUser
    );

    return (
        <React.Fragment>
            <div className="stats--single">
                <span>{userDetail?.userData.postsLength || 0}</span>
                <p>Posts</p>
            </div>
            <div className="stats--single">
                <span>{userDetail?.userData.followedByLength || 0}</span>
                <p>Followers</p>
            </div>
            <div className="stats--single">
                <span>{userDetail?.userData.followingLength || 0}</span>
                <p>Following</p>
            </div>
        </React.Fragment>
    );
}
