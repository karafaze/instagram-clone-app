import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.scss";

export default function Header() {
    const navigate = useNavigate()
    const userData = useSelector(state => state.loggedUser.userData)
    
    const handleLeave = () => {
        localStorage.removeItem('photowall-user')
        navigate('/login')
    }
    return (
        <header className="navbar">
            <Link to="/login" className="navbar--title">
                PhotoWall
            </Link>
            <div className="navbar--link">
                <Link to={`/photowall/${userData.userId}`} className="navbar--link__single">
                    <i className="ri-home-7-line"></i>
                </Link>
                <Link to={`/photowall/${userData.userId}/edit`} className="navbar--link__single">
                    <i className="ri-settings-2-line"></i>
                </Link>
                <div onClick={handleLeave} className="navbar--link__single">
                    <i className="ri-door-open-line"></i>
                </div>
            </div>
        </header>
    );
}
