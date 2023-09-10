import React from 'react';
import { Link } from 'react-router-dom';

export default function LikesList({likes}) {
	const renderLikes = likes.map(like => {
		return (
			<div className='postlike' key={like.userId}>
				<Link to={`/photowall/${like.userId}`}>
					<img className='postlike--avatar' src={like.avatarUrl} alt="concern the user id"></img>
				</Link>
				<Link to={`/photowall/${like.userId}`} className='postlike--user'>{like.username}</Link>
			</div>
		)
	})

	return renderLikes;
}
