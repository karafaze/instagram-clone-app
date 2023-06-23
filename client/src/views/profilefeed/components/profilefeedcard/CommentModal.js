import React, {useState, useRef} from "react";

import { useSelector } from "react-redux";

export default function CommentModal({ toggleComments, postId }) {
	const [commentText, setCommentText] = useState("")
	const textRef = useRef();
	const comments = useSelector(state => state.profilePost.data.comments)

	const handleEmojiClick = (e) => {
		setCommentText(prevText => `${prevText}${e.target.childNodes[0].textContent}`)
		textRef.current.focus();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(commentText)
		setCommentText("")
	}

    return (
        <div className="comment-section">
            <div className="comment-section--top">
                <span
                    className="comment-section--top__close"
                    onClick={() => toggleComments()}
                >
                    Close
                </span>
                <span className="comment-section--top__title">Comments</span>
                <i
					className="ri-send-plane-2-line"
					onClick={handleSubmit}
				></i>
            </div>
            <div className="comment-section--content">
				{
					comments.length > 0 ? (
						<div> Comments</div>
					) : (
						<React.Fragment>
							<p className="comment-section--content__empty-title">No comments on this post.</p>
							<span className="comment-section--content__empty-subtitle">Start the conversation.</span>
						</React.Fragment>
					)
				}
			</div>
            <div className="comment-section--edit">
				<div className="comment-section--edit__emoji-insert">
					<span onClick={handleEmojiClick}>&#x1F600;</span>
					<span onClick={handleEmojiClick}>&#10084;&#65039;</span>
					<span onClick={handleEmojiClick}>&#x1F525;</span>
					<span onClick={handleEmojiClick}>&#x1F609;</span>
					<span onClick={handleEmojiClick}>&#x1F602;</span>
					<span onClick={handleEmojiClick}>&#x1F622;</span>
					<span onClick={handleEmojiClick}>&#x1F44F;</span>
				</div>
				<form
					className="comment-section--edit__form"
				>
					<textarea
						ref={textRef}
						type="text"
						className="comment-section--edit__input"
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					/>
				</form>
			</div>
        </div>
    );
}

// Emoji list
// https://www.quackit.com/character_sets/emoji/emoji_v3.0/unicode_emoji_v3.0_characters_all.cfm
