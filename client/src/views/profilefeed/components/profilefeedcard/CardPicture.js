import React from "react";

export default function CardPicture({ src }) {

    return (
        <img
            className="card--content__img"
            src={src}
            alt="contains the post posted by the user"
        />
    );
}
