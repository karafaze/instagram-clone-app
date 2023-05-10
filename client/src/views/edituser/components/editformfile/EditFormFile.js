import React from "react";

import "./editformfile.scss";

export default function EditFormFile({
    isLoading,
    avatarUrl,
    hasPreview,
    preview,
    handleFileClick,
    handleChange,
}) {
    return (
        <div className="edituser-form--filewrapper">
            <div className="selectfile-wrapper">
                {isLoading ? (
                    <div className="selectfile-wrapper--current"></div>
                ) : (
                    <img
                        className="selectfile-wrapper--current"
                        src={avatarUrl}
                        alt="current-profile-avatar"
                    />
                )}
                {hasPreview ? (
                    <img
                        className="selectfile-wrapper--preview"
                        src={preview}
                        onClick={handleFileClick}
                        alt="preview-profile-avatar"
                    />
                ) : (
                    <div
                        className="selectfile-wrapper--preview"
                        onClick={handleFileClick}
                    >
                        <i className="ri-image-add-line"></i>
                    </div>
                )}
            </div>
            <button
                className="selectfile-wrapper--btn"
                onClick={handleFileClick}
            >
                Change avatar
            </button>
            <input
                onChange={handleChange}
                id="select-file"
                type="file"
                accept="image/*"
                name="avatar"
                style={{ display: "none" }}
            />
        </div>
    );
}
