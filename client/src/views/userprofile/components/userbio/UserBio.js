import React from "react";
import { useSelector } from "react-redux";
import "./userbio.scss";

export default function UserBio() {
    const userDetail = useSelector((state) => state.profile);
    return (
        <React.Fragment>
            <h3 className="bottom--username">
                {userDetail?.userData.username || ""}
            </h3>
            <p className="bottom--lorem">
                {userDetail?.userData.bio ||
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
            </p>
        </React.Fragment>
    );
}
