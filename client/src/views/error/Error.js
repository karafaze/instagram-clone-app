import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import "./error.scss";

export default function Error() {
    return (
        <React.Fragment>
            <Header />
            <main className="error-page">
                <h1 className="error-page--title">Error 404</h1>
                <p className="error-page--message">
                    Something went wrong. This page or content does not exists
                    (yet)
                </p>
                <span className="error-page--goback">
                    {/* <i className="ri-arrow-left-circle-line"></i> */}
                    <i className="ri-arrow-left-s-line"></i>
                    Get back to the app
                </span>
            </main>
            <Footer />
        </React.Fragment>
    );
}
