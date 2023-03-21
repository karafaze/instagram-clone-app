import React, { useState } from "react";
import FormInput from "../forminput/FormInput";
import FormButton from "../formbutton/FormButton";
import FormSwitch from "../formswitch/FormSwitch";

import "./form.scss";

export default function Form({ type }) {
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
        console.log(formData)
    }

    return (
        <form className="form">
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
            <FormButton handleSubmit={handleSubmit}/>
        </form>
    );
}
