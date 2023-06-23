import React from 'react';
import "./userpictureslist.scss";
import { useSelector } from "react-redux";
import Picture from "../picture/Picture";

export default function UserPicturesList() {
    const picturesList = useSelector((state) => state.profilePost.data.posts);

    const renderPost = (pictureList) => {
        return pictureList?.map(picture => {
            return <Picture
                        key={picture._id}
                        src={picture.pictureUrl}
						pictureId={picture._id}
                    />
        })
    }

    if (!picturesList) {
        return <span>Loading pictures...</span>;
    } else {
        return (
            <section className="userpictures">
                {renderPost(picturesList)}
            </section>
        );
    }
}
