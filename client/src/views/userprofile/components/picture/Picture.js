import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./picture.scss";

export default function Picture({ src }) {
    const navigate = useNavigate();
    const location = useLocation()
    return (
        <div className="userpictures--wrapper">
            <img
                className="userpictures--picture"
                src={src}
                alt="belong_to_users"
                onClick={() => navigate(`${location.pathname}/all`)}
            />
        </div>
    );
}