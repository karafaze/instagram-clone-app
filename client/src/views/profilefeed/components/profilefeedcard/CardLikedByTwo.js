import React from 'react';

export default function CardLikedByTwo({likes, loggedUserIn, loggedUser}){
	if (loggedUserIn) {
		return (
			<React.Fragment>
				<div className="userlike-wrapper">
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
					Liked by <span>you</span> and <span>{likes[0].username === loggedUser.username ? likes[1].username : likes[0].username}</span>
				</p>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<div className="userlike-wrapper">
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
					Liked by <span>{likes[0].username}</span> and <span>{likes[1].username}</span>
				</p>
			</React.Fragment>
		)
	}
}
