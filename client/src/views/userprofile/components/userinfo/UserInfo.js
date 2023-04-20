import React from "react";
import { Link, useLocation } from "react-router-dom";

import ProfilePicture from "../profilepicture/ProfilePicture";
import UserTag from "../usertag/UserTag";
import Follow from "../follow/Follow";
import UserSocial from "../usersocial/UserSocial";
import UserBio from "../userbio/UserBio";

import "./userinfo.scss";

export default function UserInfo({isLoggedUser}) {
    const location = useLocation()
    return (
        <section className="userinfo">
            <div className="userinfo--topwrapper">
                <ProfilePicture />
                <div className="top--data">
                    <div className="top--data__user">
                        <UserTag />
                        {!isLoggedUser && <Follow />}
                    </div>
                    <div className="top--data__stats">
                        <UserSocial />
                    </div>
                </div>
            </div>
            <div className="userinfo--bottomwrapper">
                <UserBio/>
            </div>
            {isLoggedUser && (
                <div className="userinfo--options">
                    <div className="userinfo--options__modify">
                        <Link to={`${location.pathname}/edit`}>Edit profile</Link>
                    </div>
                    <div className="userinfo--options__create-post">
                        <Link to={`${location.pathname}`}>Create post</Link>
                    </div>
                </div>
            )}
        </section>
    );
}
