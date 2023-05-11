import React, {useState} from 'react';
import "./userpictureslist.scss";
import { useSelector } from "react-redux";
import Picture from "../picture/Picture";

export default function UserPicturesList() {
    const [isScrolling, setIsScrolling] = useState(false)
    const picturesList = useSelector((state) => state.profilePost.data);
    
    const listStyle = {
        gridTemplateColumns: isScrolling ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)',
        gap: isScrolling ? "1em" : ".1em",
    }

    const toggleScroll = () => {
        setIsScrolling(prevState => !prevState)
    }

    const renderPost = (pictureList) => {
        return pictureList.map(picture => {
            return <Picture 
                        key={picture._id} 
                        src={picture.pictureUrl} 
                        isScrolling={isScrolling}
                        toggleScroll={toggleScroll}/>
        })
    }

    if (!picturesList) {
        return <span>Loading pictures...</span>;
    } else {
        return (
            <section style={listStyle} className="userpictures">
                {renderPost(picturesList)}
            </section>
        );
    }
}
