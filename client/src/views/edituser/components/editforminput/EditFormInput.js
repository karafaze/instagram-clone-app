import React from "react";

import "./editforminput.scss";

export default function EditFormInput({
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
            <div className="edituser-form--group">
                <label htmlFor={id} className="edituser-form--group__label">
                    {`${name[0].toUpperCase()}${name.slice(1)}`}
                </label>
                <input
                    type={type}
                    id={id}
                    className={`edituser-form--group__input ${
                        errors && "editform-input-error"
                    }`}
                    placeholder={placeholder}
                    onChange={handleChange}
                    name={name}
                    defaultValue={value}
                />
            </div>
            {errors && (
                <span className="edituser-form--error">
                    {errors.message}
                </span>
            )}
        </React.Fragment>
    );
}
