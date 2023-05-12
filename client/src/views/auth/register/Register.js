import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/forminput/FormInput";

import "../auth.scss";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [formError, setFormError] = useState({})

    useEffect(() => {
        // this function's objective is the same as in Login.js but different in 
        // its implementation since formError may contains more than 1 error. 
        setFormError(updateCurrentFormError(formError, formData))
    }, [formData])

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
                    // data.errors is an Array of error objects from the server
                    // we set formError using a function that format this data.errors Array
                    setFormError(formatErrorsToFormError(data.errors, formData))
                }
                if (data.status === 'OK'){
                    navigate("/login")
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
    // function to be used to send error message to FormInput.js
    // we simply want to return either the errorMessage
    // or null
    return formError[field]?.message || null
}

function formatErrorsToFormError(errorsArray, currentFormData){
    // we initialize an empty objects that will contain
    // our new formError
    // its shape will be an object with nested object within : 
    // { 
        // errorInputName1: {message: errorMessage, length: length of the input in formData},
        // errorInputName2: {...},
    //  }
    let formError = {};
    // we first iterate over the array of errors
    for (let errorObject of errorsArray){
        // retrieve the input name that contain the error
        const inputErrorName = errorObject.param
        // and create a new formatted error object 
        const updatedFormError = {
            message: errorObject.msg,
            length: currentFormData[inputErrorName].length
        }
        // and we add this new error to our formError object
        formError[inputErrorName] = updatedFormError
    }
    // after iteration, we have a fully new formError object that we return
    return formError;
}

function updateCurrentFormError(formError, formData){
    // we first create of copy of formError 
    let formErrorCopy = {...formError}
    // we first get a list of the keys in formError
    let keyList = Object.keys(formErrorCopy)
    if (keyList.length > 0){
        // if it contains at least one error
        // we update the key list to keep only the inputs that didn't change
        // by comparing their length
        // if the length has changed, it means the user has typed something else
        keyList = keyList.filter(key => formData[key].length === formError[key].length)

        // now that the list has been updated 
        // we iterate over the key of formErrorCopy
        for (let key of Object.keys(formErrorCopy)){
            // for each key
            // if the key is not in the keyList from above
            if (!keyList.includes(key)){
                // we delete that key and its value from the errorFormCopy
                delete formErrorCopy[key]
            }
        }
        // now we have an object that contains only errors that 
        // haven't been modified since the user sent the form 
        // and received intel from the server
        return formErrorCopy;
    }
    return formError;
}