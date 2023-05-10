import React from "react";

import "./addpostinput.scss";

export default function AddPostInput({
    id,
    type,
    name,
    placeholder,
    value,
    handleChange,
}) {
    return (
        <div className="addpost-form--group">
            <label
                htmlFor={id}
                className="addpost-form--group__label"
            >
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
    );
}
