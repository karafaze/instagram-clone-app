import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import "./notfound.scss";

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <Header />
            <main className="error-page">
                <h1 className="error-page--title">Error 404</h1>
                <p className="error-page--message">
                    Something went wrong. This page or content does not exists
                    (yet)
                </p>
                <span
                    onClick={() => navigate(-1)}
                    className="error-page--goback"
                >
                    <i className="ri-arrow-left-s-line"></i>
                    Get back to the app
                </span>
            </main>
            <Footer />
        </React.Fragment>
    );
}
