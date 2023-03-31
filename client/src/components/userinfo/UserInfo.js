import React from "react";

import ProfilePicture from "../profilepicture/ProfilePicture";
import UserTag from "../usertag/UserTag";
import Follow from "../follow/Follow";
import UserSocial from "../usersocial/UserSocial";
import UserBio from "../userbio/UserBio";

import "./userinfo.scss";

export default function UserInfo({ isAuthenticatedUser }) {
    return (
        <section className="userinfo">
            <div className="userinfo--topwrapper">
                <ProfilePicture />
                <div className="top--data">
                    <div className="top--data__user">
                        <UserTag isAuthenticatedUser={isAuthenticatedUser} />
                        <Follow />
                    </div>
                    <div className="top--data__stats">
                        <UserSocial isAuthenticatedUser={isAuthenticatedUser} />
                    </div>
                </div>
            </div>

            <div className="userinfo--bottomwrapper">
                <UserBio isAuthenticatedUser={isAuthenticatedUser}/>
            </div>
        </section>
    );
}
