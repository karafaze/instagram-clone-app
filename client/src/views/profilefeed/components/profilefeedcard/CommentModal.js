import React, {useState, useRef, useEffect} from "react";

import { useSelector, useDispatch } from "react-redux";
import { addNewComment } from "../../../../redux/actions/profilePostAction";
import CommentsList from "./CommentsList";

export default function CommentModal({ toggleComments, postData, timestamp }) {
	const [commentText, setCommentText] = useState("")
	const textRef = useRef();
	const comments = useSelector(state => state.profilePost.data.comments)
	const loggedUserData = useSelector(state => state.loggedUser.userData)
	const profileUserData = useSelector(state => state.profile.userData)
	const dispatch = useDispatch();
	useEffect(() => {
		textRef.current.focus()
	}, [])

	const handleEmojiClick = (e) => {
		setCommentText(prevText => `${prevText}${e.target.childNodes[0].textContent}`)
		textRef.current.focus();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (commentText.length > 0){
			dispatch(addNewComment(postData._id, commentText))
			setCommentText("")
		}
	}

	const postComment = comments.filter(comment => comment.post === postData._id)

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
			{
				postData.description.length > 0 ? (
					<div className="comment-section--author-title">
						<img
							className="comment-section--author-title__avatar"
							src={profileUserData.avatarUrl}
							alt="about user"
						/>
						<div className="comment-section--author-title__content">
							<h3 className="comment-section--author-title__username">{profileUserData.username}<span className="comment-section--author-title__timestamp">{timestamp}</span></h3>
							<p className="comment-section--author-title__text">{postData.description}</p>
						</div>
					</div>
				) : null
			}

				{postComment.length > 0 ? (
					<div className="comment-section--content">
						<CommentsList comments={postComment}/>
					</div>
				) : (
					<div className="comment-section--content__empty">
							<p >No comments on this post.</p>
							<span >Start a conversation.</span>
					</div>
				)}
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
					<div className="comment-section--edit__userpicture">
						<img
							src={loggedUserData.avatarUrl}
							alt="belong_to_logged_user"
						/>
					</div>
					<textarea
						ref={textRef}
						type="text"
						placeholder="Add a new comment..."
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
