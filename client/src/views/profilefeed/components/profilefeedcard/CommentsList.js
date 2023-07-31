import React from "react";

export default function CommentsList({ comments }) {
    const renderComments = comments.map((comment) => {
		const timestamp = formatTime(comment.createdAt)
        return (
            <div key={comment._id} className="comment">
				<img
					className="comment--avatar"
					src={comment.avatarUrl}
					alt="about user"
				/>
				<div className="comment--content">
                	<h3 className="comment--content__author">{comment.username} <span className="comment--content__timestamp">{timestamp}</span></h3>
                	<p className="comment--content__text">{comment.content}</p>
				</div>
            </div>
        );
    });
    return renderComments;
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
