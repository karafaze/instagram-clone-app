import React from 'react';

export default function CommentModal({toggleComments, postId}) {
	return (
		<div className="comment-section">
			<div className='comment-section--top'>
				<span onClick={() => toggleComments()}>Close</span>
				<span>Comments</span>
				<i className="ri-send-plane-2-line"></i>
			</div>
			<div className='comment-section--content'>

			</div>
			<div className='comment-section--edit'>

			</div>
		</div>
	)
}
