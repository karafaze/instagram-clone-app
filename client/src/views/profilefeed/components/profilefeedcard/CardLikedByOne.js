import React from 'react';

export default function CardLikedByOne({likes, loggedUserIn}){
	if (loggedUserIn) {
		return (
			<React.Fragment>
				<div className="userlike-wrapper">
					<img
						className="userlike-picture--solo"
						src={likes[0].avatarUrl}
						alt="small version of an user avatar"
					/>
				</div>
				<p className="userlike-by userlike-by-one">Liked by <span>you</span></p>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<div className="userlike-wrapper">
					<img
						className="userlike-picture--solo"
						src={likes[0].avatarUrl}
						alt="small version of an user avatar"
					/>
				</div>
				<p className="userlike-by userlike-by-one">
					Liked by <span>{likes[0].username}</span>
				</p>
			</React.Fragment>
		);
	}
}
