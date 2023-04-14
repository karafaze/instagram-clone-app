import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Follow from "../follow/Follow";

import "./userquerylist.scss";

export default function UserQueryList({ userList }) {
    const userDetail = useSelector((state) => state.loggedUser);
    if (!userDetail) {
        return <p>Loading..</p>;
    }
    const renderUsers = userList.map((user) => {
        return (
            <div key={user.userId} className="query-list--wrapper">
                <Link
                    className="query-list--usercard"
                    to={`/photowall/${user.userId}`}
                >
                        <img
                            className="query-list--usercard__avatar"
                            src={user.avatarUrl}
                            alt='display_user_avatar'
                        />
                            <p className="query-list--usercard__name">
                                {user.username}
                            </p>
                 </Link>
            </div>                
        );
    });
    if (!renderUsers) return <p>Loading data</p>;
    return (<div className="query-list">
        {renderUsers}
    </div>);
}

// function isFollowing(arr, userId) {
//     return arr.find((id) => id === userId);
// }

// function isBeingFollowed(arr, userId) {
//     return arr.find((id) => id === userId);
// }
