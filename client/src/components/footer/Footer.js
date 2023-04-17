import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./footer.scss";

export default function Footer() {
    const userData = useSelector(state => state.loggedUser.userData);

    return (
        <footer className="footer">
            <div className="footer--link">
                <Link to="/photowall/search">
                    <i className="ri-search-line"></i>
                </Link>
            </div>
            <div className="footer--link">
                <Link to={`/photowall/${userData.userId}`}>
                    <i className="ri-add-line footer--link__add"></i>
                </Link>
            </div>
            <div className="footer--link">
                <Link to={`/photowall/${userData.userId}`}>
                    <i className="ri-message-2-line"></i>
                </Link>
            </div>
        </footer>
    );
}
