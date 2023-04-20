import React from "react";

import "./loadingspinner.scss";

export default function LoadingSpinner({ message = "" }) {
    return (
        <div className="loading-spinner">
            <div className="loading-spinner--circle">
                <div className="loading-spinner--circle__inner"></div>
            </div>
            {message === "" ? null : (
                <div className="loading-spinner--message">
                    <p className="loading-spinner--message__content">
                        {message}
                    </p>
                </div>
            )}
        </div>
    );
}
