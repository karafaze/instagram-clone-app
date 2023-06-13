import React from 'react';

export default function CardLikedByMore({likes, loggedUserIn, loggedUser}){
	if (loggedUserIn){
		return (
			<React.Fragment>
				<div className="userlike-wrapper">
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
					Liked by <span>you</span> and <span>{likes.length - 1} others</span>
				</p>
			</React.Fragment>
		)
	} else {
		const randomIndex = Math.floor(Math.random() * likes.length)
		return (
			<React.Fragment>
				<div className="userlike-wrapper">
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
					Liked by <span>{likes[randomIndex].username}</span> and <span>{likes.length - 1} others</span>
				</p>
			</React.Fragment>
		)
	}
}
