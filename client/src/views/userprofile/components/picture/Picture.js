import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./picture.scss";

export default function Picture({ src, toggleScroll }) {
    const navigate = useNavigate();
    const location = useLocation()
    return (
        <div className="userpictures--wrapper">
            <img
                className="userpictures--picture"
                src={src}
                alt="belong_to_users"
                onClick={() => navigate(`${location.pathname}/all`)}
            />
        </div>
    );
}
        // return (
        //     <div className="card" onClick={toggleScroll}>
        //         <div className="card--content">
        //             <img className="card--content__img" src={src} />
        //         </div>
        //         <div className="card--bottom">
        //             <div className="card--bottom__cta">
        //                 <div className="cta-like">
        //                     <i className="ri-heart-line"></i>
        //                 </div>
        //                 <div className="cta-comment">
        //                     <i className="ri-chat-1-line"></i>
        //                 </div>
        //             </div>
        //             <div className="card--bottom__likes">
        //                 <div className="userlike-wrapper"></div>
        //                 <p className="userlike-by">
        //                     Liked by <span>peter</span> and
        //                     <span>others</span>
        //                 </p>
        //             </div>
        //             <div className="card--bottom__comments">
        //                 <div className="comment">
        //                     <h3 className="comment--author">markus</h3>
        //                     <p className="comment--content">
        //                         Waves coming! &#9975;
        //                     </p>
        //                     <span className="comment--timestamp">
        //                         1 hour ago
        //                     </span>
        //                 </div>
        //                 <p className="comment--load">View all comments</p>
        //             </div>
        //         </div>
        //     </div>
        // );


