import React from "react";
import ProfilePicture from "../profilepicture/ProfilePicture";
import UserTag from "../usertag/UserTag";
import Follow from "../follow/Follow";
import UserSocial from "../usersocial/UserSocial";
import UserBio from "../userbio/UserBio";

import "./userinfo.scss";

export default function UserInfo() {
    return (
        <section className="userinfo">
            <div className="userinfo--topwrapper">
                <ProfilePicture />
                <div className="top--data">
                    <div className="top--data__user">
                        <UserTag />
                        <Follow />
                    </div>
                    <div className="top--data__stats">
                        <UserSocial />
                    </div>
                </div>
            </div>

            <div className="userinfo--bottomwrapper">
                <UserBio />
            </div>
        </section>
    );
}
