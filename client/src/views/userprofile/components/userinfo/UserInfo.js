import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfilePicture from "../profilepicture/ProfilePicture";
import UserTag from "../usertag/UserTag";
import Follow from "../follow/Follow";
import UserSocial from "../usersocial/UserSocial";
import UserBio from "../userbio/UserBio";

import "./userinfo.scss";

export default function UserInfo({isLoggedUser}) {
    const loggedUserDetail = useSelector(state => state.loggedUser.userData)
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
                <div className="userinfo--modify">
                    <Link to={`/photowall/${loggedUserDetail.userId}/edit`}>Edit profile</Link>
                </div>
            )}
        </section>
    );
}
