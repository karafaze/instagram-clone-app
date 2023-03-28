import React from "react";
import avatarUrl from '../../assets/images/avatar-1.png'
import "./profilepicture.scss";

export default function ProfilePicture() {
    return (
        <img
            className="top--picture"
            src={avatarUrl}
            alt="avatar"
        ></img>
    );
}
