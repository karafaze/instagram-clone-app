import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/forminput/FormInput";

import "./register.scss";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [formError, setFormError] = useState({})

    useEffect(() => {
        // this function's objective is the same as in Login.js but different in 
        // its implementation since formError contains more than 1 key. 

        // we first get a list of the keys in formError
        let keyList = Object.keys(formError)
        if (keyList.length > 0){
            // if it contains at least one error
            // we update the key list to keep only the inputs that didn't change
            // by comparing their length
            keyList = keyList.filter(key => formData[key].length === formError[key].length)

            // now that the list has been updated, we create a copy of formError
            let formErrorCopy = {...formError}
            // we iterate over the key of this object
            for (let key of Object.keys(formErrorCopy)){
                // if the keys is not in the keyList from above
                // it means the user has typed something else 
                if (!keyList.includes(key)){
                    // we delete that key and its value from the errorFormCopy
                    delete formErrorCopy[key]
                }
            }
            // now we have an object that contains only errors that 
            // haven't been modified since the user sent the form 
            // and received intel from the server
            setFormError(formErrorCopy)
        }
    }, [ formData])
    
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
        fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.errors){
                    const updatedFormError = {}
                    for (let errorObject of data.errors){
                        const inputErrorName = errorObject.param;
                        const newFormError = {
                            message: errorObject.msg,
                            length: formData[inputErrorName].length
                        }
                        updatedFormError[inputErrorName] = newFormError
                    }
                    setFormError(updatedFormError)
                }
            })
            .catch((err) => console.log(err));
    };
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
                            id: "email",
                            type: "text",
                            placeholder: "Email",
                            name: "email",
                            value: formData.email,
                            onChange: handleChange,
                            errors: checkErrorInForm(formError, 'email')
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
                    <FormInput
                        attr={{
                            id: "passwordConfirm",
                            type: "password",
                            placeholder: "Confirm password",
                            name: "passwordConfirm",
                            value: formData.passwordConfirm,
                            onChange: handleChange,
                            errors: checkErrorInForm(formError, 'passwordConfirm')
                        }}
                    />
                    <button className="form--btn">Register</button>
                </form>
                <div className="signup-link">
                    <p>Already have an account ?</p>
                    <Link to="/login">Log in</Link>
                </div>
            </section>
        </main>
    );
}

function checkErrorInForm(formError, field){
    if (formError[field]){
        return formError[field].message
    }
    return null
}