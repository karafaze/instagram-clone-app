import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/forminput/FormInput";

import "../auth.scss";

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formError, setFormError] = useState({})
    
    useEffect(() => {
        // this function's objective is to manage the formError display
        // if we get an error back from the server and display a message
        // we want to delete the message once the user is typing something else
        setFormError(updateCurrentFormError(formError, formData))
    }, [formData, formError])

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [name]: value.trim(),
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'FAILED'){
                    setFormError({
                        // formError will be an object with the shape:
                        // { errorName: errorMessage, length: length of the input in formData }
                        // we want to get the length of the input that was inserted so we can compare it 
                        // and modify the formError if the user types something else
                        [data.field]: data.error,
                        length: formData[data.field].length
                    })
                } 
                if (data.status === 'OK'){
                    const userData = {
                        userId: data.userId,
                        token: data.token
                    }
                    localStorage.setItem('photowall-user', JSON.stringify(userData))
                    navigate(`/photowall/${data.userId}`)
                }
            })
            .catch((err) => console.log(err));

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
                            errors: checkErrorInForm(formError, 'username')
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
                            errors: checkErrorInForm(formError, 'password')
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

function checkErrorInForm(formError, field){
    // function to be used to send error message to FormInput.js
    // we simply want to return either the errorMessage
    // or null
    return formError[field] || null
}

function updateCurrentFormError(formError, formData){
    const errorInForm = Object.keys(formError)
    // check if formError is not empty
    if (errorInForm.length > 0){
        // if not empty we retrieve the key that contains the error
        const key = errorInForm[0]
        // now we compare the length of the key with its equal in formData
        // if they are not the same, we know the user is typing something else
        // so we return an empty object to reset formError
        if (formData[key].length !== formError.length){
            return {}
        }
        return formError
    }
    return formError
}

function checkIfEmpty(input){
    return input === ''
}