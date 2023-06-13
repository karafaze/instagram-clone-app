import React from 'react';

export default function CardDescription({username, description}){
	return (
		<React.Fragment>
			<p><span>{username}</span> {description}</p>
		</React.Fragment>
	)
}
