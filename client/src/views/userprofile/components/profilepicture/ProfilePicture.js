import React from "react";
import { useSelector } from "react-redux";
import "./profilepicture.scss";

export default function ProfilePicture() {
    const userData = useSelector(state => state.profile.userData)
    return (
        <img
            className={userData ? "top--picture" : "top--picture__empty"}
            src={userData?.avatarUrl || ""}
            alt="avatar"
        ></img>
    );
}
