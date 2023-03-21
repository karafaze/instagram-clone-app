import React from "react";
import {Link} from 'react-router-dom';

import Form from '../../components/form/Form'
import "./register.scss";

export default function Register() {
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
                <Form />
                <div className="signup-link">
                    <p>Already have an account ?</p>
                    <Link to="/login">Log in</Link>
                </div>
            </section>
        </main>
    );
}
