import React from 'react';
import { useSelector } from 'react-redux';
import ProfileFeedCard from '../profilefeedcard/ProfileFeedCard';

import './profilefeedlist.scss';

export default function ProfileFeedList(){
    const picturesList = useSelector((state) => state.profilePost.data);

    const renderPost = (picturesList) => {
        return picturesList.map(picture => {
            return <ProfileFeedCard 
                        key={picture._id} 
                        data={picture}
                        />
        })
    }
    if (!picturesList){
        return <span>Loading data...</span>
    }
    return renderPost(picturesList)
}