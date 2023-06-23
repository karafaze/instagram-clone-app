import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import ProfileFeedCard from "../profilefeedcard/ProfileFeedCard";

import "./profilefeedlist.scss";

export default function ProfileFeedList() {
    const picturesList = useSelector((state) => state.profilePost.data.posts);

	useEffect(() => {
		const itemToScroll = localStorage.getItem("photowall-scroll");
		if (!itemToScroll){
			return;
		} else {
			const elemToScoll = document.body.querySelector(`#pic-${itemToScroll}`)
			if(elemToScoll){
				elemToScoll.scrollIntoView({behavior: 'smooth'})
			}
		}
	}, [picturesList])

    const renderPost = (picturesList) => {
        return picturesList.map((picture) => {
            return (
                <ProfileFeedCard
                    key={picture._id}
                    data={picture}
					pictureId={picture._id}
                />
            );
        });
    };

    if (!picturesList) {
        return <span>Loading data...</span>;
    }
    return (
        <React.Fragment>
            <section className="posts-container">
                {renderPost(picturesList)}
            </section>
        </React.Fragment>
    );
}
