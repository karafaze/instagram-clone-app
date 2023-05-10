import React from "react";

import "./addpostfile.scss";

export default function AddPostFile({ 
    handleChange, 
    handleFileClick, 
    hasPreview, 
    preview,
}) {
    return (
        <React.Fragment>
            {hasPreview ? (
                <img
                    className="addpost-wrapper--preview"
                    src={preview}
                    onClick={handleFileClick}
                    alt="preview-new-post-image"
                />
            ) : (
                <div
                    className="addpost-wrapper--preview"
                    onClick={handleFileClick}
                >
                    <i className="ri-image-add-line"></i>
                </div>
            )}
            <button
                className="addpost-wrapper--btn"
                onClick={handleFileClick}
            >
                Choose picture
            </button>
            <input
                onChange={handleChange}
                id="select-file"
                type="file"
                accept="image/*"
                name="avatar"
                style={{ display: "none" }}
            />
        </React.Fragment>
    );
}
