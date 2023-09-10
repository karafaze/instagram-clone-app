import React from "react";
import LikesList from "./LikesList";

export default function LikesModal({ toggleLikes, likes }) {
    return (
        <div className="likes-section">
            <div className="likes-section--top">
                <span
                    className="likes-section--top__close"
                    onClick={() => toggleLikes()}
                >
                    Close
                </span>
                <span className="likes-section--top__title">Likes</span>
            </div>
			<div className="likes-section--content">
				{likes.length > 0 ? (
					<div className="comment-section--content">
						<LikesList likes={likes}/>
					</div>
				) : (
					null
				)}
			</div>
        </div>
    );
}
