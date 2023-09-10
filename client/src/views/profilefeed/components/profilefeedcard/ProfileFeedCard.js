import React, {useState} from 'react';

import { useSelector } from 'react-redux';

import CardPicture from "./CardPicture";
import CardLike from "./CardLike";
import CardComment from "./CardComment";
import CardLikedByWrapper from "./CardLikedByWrapper";
import CardDescription from './CardDescription';
import CommentModal from './CommentModal';
import LikesModal from './LikesModal';

import "./profilefeedcard.scss";

export default function ProfileFeedCard({ data, pictureId }) {

	const comments = useSelector(state => state.profilePost.data.comments)
	const allLikes = useSelector(state => state.profilePost.data.likes)

	const sortedLikes = allLikes.filter(like => {
		return data.likes.includes(like.userId)
	})

    const [showComments, setShowComments] = useState(() => {
		document.body.style.overflow = "";
		return false;
	});

	const [showLikes, setShowLikes] = useState(() => {
		document.body.style.overflow = "";
		return false;
	})

    const toggleComments = () => {
		if (showComments) {
			document.body.style.overflow = ""
			setShowComments(false)
		} else if (!showComments){
			setShowComments(true)
			document.body.style.overflow = "hidden"
		}
    };

	const toggleLikes = () => {
		if (showLikes) {
			document.body.style.overflow = ""
			setShowLikes(false)
		} else if (!showComments){
			setShowLikes(true)
			document.body.style.overflow = "hidden"
		}
	}

	const profileUser = useSelector(state => state.profile.userData);
	const formattedDate = getFormattedDate(new Date(data.createdAt))
	const frontComment = comments.filter(comment => comment.post === pictureId)

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
                    <div className="card--bottom__likes" >
                        <CardLikedByWrapper likes={data.likes} toggleLikes={toggleLikes}/>
                    </div>
                ) : null}
				{data.description && (
					<div className='card--bottom__description'>
						<CardDescription username={profileUser.username} description={data.description} />
					</div>
				)}
                <div className="card--bottom__comments">
					{
						frontComment.length > 0 ? (
							<React.Fragment>
							<div className="frontcomment">
								<h3 className="frontcomment--author">{frontComment[0].username}</h3>
								<p className="frontcomment--text">
								{frontComment[0].content}
								</p>
								<span className="frontcomment--timestamp">{formatTime(frontComment[0].createdAt)}</span>
							</div>
							<p className="comment--load" onClick={toggleComments}>View {frontComment.length === 1 ? "comment" : `all ${frontComment.length} comments`}</p>
							</React.Fragment>

						) : (
							null
						)
					}
                </div>
				<span className='card--bottom__date'>{formattedDate}</span>
            </div>
        </div>
		{showLikes ? <LikesModal toggleLikes={toggleLikes} likes={sortedLikes}/> : null}
		{showComments ? <CommentModal toggleComments={toggleComments} postData={data} timestamp={formatTime(data.createdAt)} /> : null}

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


const formatTime = (time) => {
	let today = new Date();
	let commentTime = new Date(time);
	let formattedTimestamp = '';
	if (today.getFullYear() > commentTime.getFullYear()) {
		formattedTimestamp = `${today.getFullYear() - commentTime.getFullYear()} year ago`
	} else if (today.getMonth() > commentTime.getMonth()){
		formattedTimestamp = `${today.getMonth() - commentTime.getMonth()} months ago`
	} else if (today.getDate() > commentTime.getDate()){
		formattedTimestamp = `${today.getDate() - commentTime.getDate()} days ago`
	} else if (today.getHours() > commentTime.getHours()){
		formattedTimestamp = `${today.getHours() - commentTime.getHours()} hours ago`
	} else if (today.getMinutes() > commentTime.getMinutes()){
		formattedTimestamp = `${today.getMinutes() - commentTime.getMinutes()} minutes ago`
	} else {
		formattedTimestamp = "just now"
	}
	return formattedTimestamp
}
