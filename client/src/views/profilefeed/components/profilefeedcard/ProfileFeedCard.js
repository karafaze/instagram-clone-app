import React from 'react';

import CardPicture from "./CardPicture";
import CardLike from "./CardLike";
import CardComment from "./CardComment";
import CardLikedBy from "./CardLikedBy";

import "./profilefeedcard.scss";

export default function ProfileFeedCard({ data }) {
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
                        <CardLikedBy likes={data.likes}/>
                    </div>
                ) : null}
                <div className="card--bottom__comments">
                    <div className="comment">
                        <h3 className="comment--author">markus</h3>
                        <p className="comment--content">
                            Waves coming! &#9975;
                        </p>
                        <span className="comment--timestamp">1 hour ago</span>
                    </div>
                    <p className="comment--load">View all comments</p>
                </div>
            </div>
        </div>
    );
}
