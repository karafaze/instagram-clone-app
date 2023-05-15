import React from "react";
// import { useDispatch } from "react-redux";

export default function CardComment({comments}) {
    // const dispatch = useDispatch();

    const updateComment = () => {
        console.log('cliked')
    }
    return (
        <div onClick={updateComment} className="cta-comment">
            <i className="ri-chat-1-line"></i>
        </div>
    );
}