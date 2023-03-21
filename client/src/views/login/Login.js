import React from "react";
import { Link } from "react-router-dom";

import Form from "../../components/form/Form";

import "./login.scss";

export default function Login() {
    return (
        <main>
            <h1 className="site-name">PhotoWall</h1>
            <h2 className="site-slogan">
                Share, like and discover pictures from all over the world
            </h2>
            <section className="login-wrapper">
                <div className="login-logo">
                    <i className="ri-team-fill"></i>
                </div>
                <Form type={"login"}/>
                <div className="signup-link">
                    <p>Are you new here ?</p>
                    <Link to="/register">Register</Link>
                </div>
            </section>
        </main>
    );
}
