import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addLikeToPost, removeLikeFromPost } from "../../../../redux/actions/profilePostAction";
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

export default function CardLike({likes, postId}) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.loggedUser.userData)

    const postLiked = likes.includes(loggedUser.userId)
    const updateLike = async () => {
        const likeBtn = document.querySelector(".cta-like");
        likeBtn.classList.add("disabled-btn");

        await new Promise((resolve) => {
            postLiked
                ? resolve(dispatch(removeLikeFromPost(loggedUser.userId, postId)))
                : resolve((dispatch(addLikeToPost(loggedUser.userId, postId))))
        });
        // when follow actions have been dealt with in the back-end
        // re-instate clicking option on span button
        likeBtn.classList.remove("disabled-btn");
    }

    if (!loggedUser){
        return <LoadingSpinner />
    }
    return (
        <div onClick={updateLike} className="cta-like">
            { !postLiked ? (<i className="ri-heart-line"></i>) : (<i style={{color: "#AA3939"}} className="ri-heart-fill"></i>)}
        </div>
    );
}