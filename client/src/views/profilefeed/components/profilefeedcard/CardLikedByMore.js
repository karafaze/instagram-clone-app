import React from 'react';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CardLikedByMore({likes, loggedUserIn, toggleLikes}){
	const loggedUserId = useSelector(state => state.loggedUser.userData.userId)

	if (loggedUserIn){
		return (
			<React.Fragment>
				<div className="userlike-wrapper" onClick={toggleLikes}>
						<img
							className="userlike-picture--trio__1"
							src={likes[0].avatarUrl}
							alt="small version of an user avatar"
						/>
						<img
							className="userlike-picture--trio__2"
							src={likes[1].avatarUrl}
							alt="small version of an user avatar"
						/>
						<img
							className="userlike-picture--trio__3"
							src={likes[2].avatarUrl}
							alt="small version of an user avatar"
						/>
				</div>
				<p className="userlike-by userlike-by-more">
					Liked by <Link to={`/photowall/${loggedUserId}`}>you</Link> and <span onClick={toggleLikes}>{likes.length - 1} others</span>
				</p>
			</React.Fragment>
		)
	} else {
		const randomIndex = Math.floor(Math.random() * likes.length)
		return (
			<React.Fragment>
				<div className="userlike-wrapper" onClick={toggleLikes}>
						<img
							className="userlike-picture--trio__1"
							src={likes[0].avatarUrl}
							alt="small version of an user avatar"
						/>
						<img
							className="userlike-picture--trio__2"
							src={likes[1].avatarUrl}
							alt="small version of an user avatar"
						/>
						<img
							className="userlike-picture--trio__3"
							src={likes[2].avatarUrl}
							alt="small version of an user avatar"
						/>
				</div>
				<p className="userlike-by userlike-by-more">
					Liked by <Link to={`/photowall/${likes[randomIndex].userId}`}>{likes[randomIndex].username}</Link> and <span onClick={toggleLikes}>{likes.length - 1} others</span>
				</p>
			</React.Fragment>
		)
	}
}
