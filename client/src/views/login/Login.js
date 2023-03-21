import React from "react";
import Form from "../../components/form/Form";

import "./login.scss";

export default function Login() {
    return (
        <main>
            <h1 className="site-name">PhotoWall</h1>
            <h2 className="site-slogan">Share, like and discover pictures from all over the world</h2>
            <Form />
        </main>
    );
}