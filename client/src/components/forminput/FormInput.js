import React from "react";

import "./forminput.scss";

export default function FormInput(props) {
    const { id, type=null, placeholder, name, value, onChange } = props.attr;
    return (
        <div className="form--field">
            <label 
                className="form--field__label" 
                htmlFor={name} 
            >
                <i className={type === 'password' ? "ri-lock-line" : "ri-user-3-line"}></i>
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
