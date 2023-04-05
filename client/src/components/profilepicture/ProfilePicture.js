import React from "react";
import { useSelector } from "react-redux";
import "./profilepicture.scss";

export default function ProfilePicture() {
    const userDetail = useSelector(state => state.profile)
    if (!userDetail) return <p>Loading data</p>
    return (
        <img
            className="top--picture"
            src={userDetail.userData.avatarUrl}
            alt="avatar"
        ></img>
    );
}
