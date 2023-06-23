import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./picture.scss";

export default function Picture({ src, pictureId }) {
    const navigate = useNavigate();
    const location = useLocation()

	const handleClick = () => {
		localStorage.setItem('photowall-scroll', pictureId);
		navigate(`${location.pathname}/all`)
	}

    return (
        <div className="userpictures--wrapper">
            <img
                className="userpictures--picture"
                src={src}
                alt="belong_to_users"
                onClick={handleClick}
            />
        </div>
    );
}
