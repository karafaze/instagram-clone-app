import React, {useState} from 'react';

import { useSelector } from 'react-redux';

import CardPicture from "./CardPicture";
import CardLike from "./CardLike";
import CardComment from "./CardComment";
import CardLikedByWrapper from "./CardLikedByWrapper";
import CardDescription from './CardDescription';
import CommentModal from './CommentModal';

import "./profilefeedcard.scss";

export default function ProfileFeedCard({ data, pictureId }) {

    const [showComments, setShowComments] = useState(() => {
		document.body.style.overflow = "";
		return false;
	});

    const toggleComments = () => {
		if (showComments) {
			document.body.style.overflow = ""
			setShowComments(false)
		} else if (!showComments){
			setShowComments(true)
			document.body.style.overflow = "hidden"
		}
    };

	const profileUser = useSelector(state => state.profile.userData);
	const formattedDate = getFormattedDate(new Date(data.createdAt))

    return (
		<React.Fragment>
        <div className="card" id={`pic-${pictureId}`}>
            <div className="card--content">
                <CardPicture src={data.pictureUrl} />
            </div>
            <div className="card--bottom">
                <div className="card--bottom__cta">
                    <CardLike likes={data.likes} postId={data._id} />
                    <CardComment toggleComments={toggleComments} />
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
				<span className='card--bottom__date'>{formattedDate}</span>
            </div>
        </div>
		{showComments ? <CommentModal toggleComments={toggleComments} postId={data._id} /> : null}
		</React.Fragment>

    );
}

function getFormattedDate(rawDate){
	const months = {
		0: "January",
		1: "February",
		2: "March",
		3: "April",
		4: "May",
		5: "June",
		6: "July",
		7: "August",
		8: "September",
		9: "October",
		10: "November",
		11: "December",
	};
	let dateMonth = rawDate.getMonth()
	dateMonth = months[dateMonth]
	const dateDay = rawDate.getDate()
	return `${dateMonth} ${dateDay}, ${rawDate.getFullYear()}`
}


