import React from "react";

import "./addpostfile.scss";

export default function AddPostFile({
    handleChange,
    handleFileClick,
    hasPreview,
    preview,
	errors,
}) {
    return (
        <React.Fragment>
			<div className="addpost-form--filewrapper">
			{hasPreview ? (
                <img
                    className="addpost-wrapper--preview"
                    src={preview}
                    onClick={handleFileClick}
                    alt="preview-new-post"
                />
            ) : (
                <div
                    className="addpost-wrapper--preview"

                >
                    <i onClick={handleFileClick} className="ri-image-add-line"></i>
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
			{errors && <span className="addpost-form--error">{errors.message}</span>}
			</div>
        </React.Fragment>
    );
}
