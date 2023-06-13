import React from 'react';

import { useSelector } from 'react-redux';

import CardPicture from "./CardPicture";
import CardLike from "./CardLike";
import CardComment from "./CardComment";
import CardLikedByWrapper from "./CardLikedByWrapper";
import CardDescription from './CardDescription';

import "./profilefeedcard.scss";

export default function ProfileFeedCard({ data }) {
	const profileUser = useSelector(state => state.profile.userData);
    return (
        <div className="card">
            <div className="card--content">
                <CardPicture src={data.pictureUrl} />
            </div>
            <div className="card--bottom">
                <div className="card--bottom__cta">
                    <CardLike likes={data.likes} postId={data._id} />
                    <CardComment comments={data.comments} />
                </div>
                {data.likes.length > 0 ? (
                    <div className="card--bottom__likes">
                        <CardLikedByWrapper likes={data.likes}/>
                    </div>
                ) : null}
				{data.description && (
					<div className='card--bottom__description'>
						<CardDescription username={profileUser.username} description={data.description} />
					</div>
				)}
                {/* <div className="card--bottom__comments">
                    <div className="comment">
                        <h3 className="comment--author">markus</h3>
                        <p className="comment--content">
                            Waves coming! &#9975;
                        </p>
                        <span className="comment--timestamp">1 hour ago</span>
                    </div>
                    <p className="comment--load">View all comments</p>
                </div> */}
            </div>
        </div>
    );
}
