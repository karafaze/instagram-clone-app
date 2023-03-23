import React from "react";

import "./forminput.scss";

export default function FormInput(props) {
    const { id, type=null, placeholder, name, value, onChange } = props.attr;
    const inputIcon = {
        'username': "ri-user-3-line",
        'email': "ri-mail-line",
        'password': "ri-lock-unlock-line",
        'passwordConfirm': "ri-lock-2-line",
    }
    return (
        <div className="form--field">
            <label 
                className="form--field__label" 
                htmlFor={name} 
            >
                <i className={inputIcon[name]}></i>
            </label>
            <input
                className="form--field__input"
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                defaultValue={value}
                onChange={onChange}
            />
        </div>
    );
}
