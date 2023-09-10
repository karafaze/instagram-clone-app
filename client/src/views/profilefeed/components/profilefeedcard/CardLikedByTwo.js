import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CardLikedByTwo({likes, loggedUserIn, loggedUser, toggleLikes}){
	const loggedUserId = useSelector(state => state.loggedUser.userData.userId)

	if (loggedUserIn) {
		return (
			<React.Fragment>
				<div className="userlike-wrapper" onClick={toggleLikes}>
						<img
							className="userlike-picture--duo__1"
							src={likes[0].avatarUrl}
							alt="small version of an user avatar"
						/>
						<img
							className="userlike-picture--duo__2"
							src={likes[1].avatarUrl}
							alt="small version of an user avatar"
						/>

				</div>
				<p className="userlike-by userlike-by-two">
					Liked by <Link to={`/photowall/${loggedUserId}`}>you</Link> and <Link to={likes[0].username === loggedUser.username ? `/photowall/${likes[1].userId}` :  `/photowall/${likes[0].userId}`}>{likes[0].username === loggedUser.username ? likes[1].username : likes[0].username}</Link>
				</p>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<div className="userlike-wrapper" onClick={toggleLikes}>
						<img
							className="userlike-picture--duo__1"
							src={likes[0].avatarUrl}
							alt="small version of an user avatar"
						/>
						<img
							className="userlike-picture--duo__2"
							src={likes[1].avatarUrl}
							alt="small version of an user avatar"
						/>
				</div>
				<p className="userlike-by userlike-by-two">
					Liked by <Link to={`/photowall/${likes[0].userId}`}>{likes[0].username}</Link> and <Link to={`/photowall/${likes[1].userId}`}>{likes[1].username}</Link>
				</p>
			</React.Fragment>
		)
	}
}
