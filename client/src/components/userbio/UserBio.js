import React from "react";

import "./userbio.scss";

export default function UserBio() {
    return (
        <React.Fragment>
            <h3 className="bottom--username">John Doe</h3>
            <p className="bottom--lorem">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
        </React.Fragment>
    );
}
