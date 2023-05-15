import React from "react";

export default function CardLikedBy({likes, users}) {
    console.log(likes)
    console.log(users)
    return (
        <React.Fragment>
            <div className="userlike-wrapper"></div>
            <p className="userlike-by">
                Liked by <span>peter</span> and
                <span>others</span>
            </p>
        </React.Fragment>
    );
}
