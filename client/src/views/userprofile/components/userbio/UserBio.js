import React from "react";
import { useSelector } from "react-redux";

import "./userbio.scss";

export default function UserBio() {
    const userData = useSelector((state) => state.profile.userData);
    return (
        <React.Fragment>
            <h3 className="bottom--username">
                {userData?.username || ""}
            </h3>
            <p className="bottom--lorem">
                {userData?.bio ||
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
            </p>
        </React.Fragment>
    );
}
