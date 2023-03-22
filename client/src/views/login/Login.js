import React, {useState} from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/forminput/FormInput";

import "./login.scss";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <main className="login-page-wrapper">
            <h1 className="site-name">PhotoWall</h1>
            <h2 className="site-slogan">
                Share, like and discover pictures from all over the world
            </h2>
            <section className="login-wrapper">
                <div className="login-logo">
                    <i className="ri-team-fill"></i>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <FormInput
                        attr={{
                            id: "username",
                            type: "text",
                            placeholder: "Username",
                            name: "username",
                            value: formData.username,
                            onChange: handleChange,
                        }}
                    />
                    <FormInput
                        attr={{
                            id: "password",
                            type: "password",
                            placeholder: "Password",
                            name: "password",
                            value: formData.password,
                            onChange: handleChange,
                        }}
                    />
                    <button className="form--btn">Log In</button>
                </form>
                <div className="signup-link">
                    <p>Are you new here ?</p>
                    <Link to="/register">Register</Link>
                </div>
            </section>
        </main>
    );
}
