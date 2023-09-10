import React from "react";

import "./addpostinput.scss";

export default function AddPostInput({
    id,
    type,
    name,
    placeholder,
    value,
    handleChange,
    errors,
}) {
    return (
        <React.Fragment>
            <div className="addpost-form--group">
                <label htmlFor={id} className="addpost-form--group__label">
                    {`${name[0].toUpperCase()}${name.slice(1)}`}
                </label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    className="addpost-form--group__input"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </div>
            {errors && <span className="addpost-form--error">{errors.message}</span>}
        </React.Fragment>
    );
}
