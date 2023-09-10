import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CardLikedByOne({likes, loggedUserIn, toggleLikes}){
	const loggedUserId = useSelector(state => state.loggedUser.userData.userId)
	if (loggedUserIn) {
		return (
			<React.Fragment>
				<div className="userlike-wrapper" onClick={toggleLikes}>
						<img
							className="userlike-picture--solo"
							src={likes[0].avatarUrl}
							alt="small version of an user avatar"
						/>
				</div>
				<p className="userlike-by userlike-by-one">Liked by <Link to={`/photowall/${loggedUserId}`}>you</Link></p>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<div className="userlike-wrapper" onClick={toggleLikes}>
						<img
							className="userlike-picture--solo"
							src={likes[0].avatarUrl}
							alt="small version of an user avatar"
						/>
				</div>
				<p className="userlike-by userlike-by-one">
					Liked by <Link to={`/photowall/${likes[0].userId}`}>{likes[0].username}</Link>
				</p>
			</React.Fragment>
		);
	}
}
