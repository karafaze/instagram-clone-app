import React from "react";
import { useNavigate } from "react-router-dom";

import "./headerback.scss";

// works as HOC, will return children within a header that
// has a an arrow to go back
export default function HeaderBack({ children }) {
    const navigate = useNavigate();
    return (
        <header className="headerback">
            <div onClick={() => navigate(-1)} className="headerback--arrow">
                <i className="ri-arrow-left-s-line"></i>
            </div>
            {children}
        </header>
    );
}
