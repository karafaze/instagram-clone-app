import React from "react";
import { Link } from "react-router-dom";

import "./usercard.scss";

export default function UserCard({ user }) {
    return (
        <Link
            key={user.userId}
            className="follow--usercard"
            to={`/photowall/${user.userId}`}
        >
            <img
                className="follow--usercard__avatar"
                src={user.avatarUrl}
                alt="display_user_avatar"
            />
            <p className="follow--usercard__name">{user.username}</p>
        </Link>
    );
}
