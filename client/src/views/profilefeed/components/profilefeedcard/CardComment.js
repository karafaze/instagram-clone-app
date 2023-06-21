import React from "react";

export default function CardComment({toggleComments}) {

    return (
        <div onClick={toggleComments} className="cta-comment">
            <i className="ri-chat-1-line"></i>
        </div>
    );
}
