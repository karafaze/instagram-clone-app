import React from "react";

import "./usersocial.scss";

export default function UserSocial() {
    return (
        <React.Fragment>
            <div className="stats--single">
                <span>34</span>
                <p>Posts</p>
            </div>
            <div className="stats--single">
                <span>302</span>
                <p>Followers</p>
            </div>
            <div className="stats--single">
                <span>129</span>
                <p>Following</p>
            </div>
        </React.Fragment>
    );
}
