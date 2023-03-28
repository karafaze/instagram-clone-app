import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
    return (
        <header className="navbar">
            <Link to="/login" className="navbar--title">
                PhotoWall
            </Link>
            <div className="navbar--link">
                <Link to="/login" className="navbar--link__single">
                    <i className="ri-home-7-line"></i>
                </Link>
                <Link to="/login" className="navbar--link__single">
                    <i className="ri-settings-2-line"></i>
                </Link>
                <Link to="/login" className="navbar--link__single">
                    <i className="ri-user-line"></i>
                </Link>
            </div>
        </header>
    );
}
