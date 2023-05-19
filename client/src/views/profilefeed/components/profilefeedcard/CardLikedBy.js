import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function CardLikedBy({ likes, users }) {
    const userLikesInState = useSelector((state) => state.profilePost.data.likes);
    const loggedUser = useSelector((state) => state.loggedUser.userData);
    const loggedUserIn = likes.includes(loggedUser.userId)
    const userLikes = userLikesInState.filter(user => likes.includes(user.userId))
    if (userLikes.length === 0){
        return 
    }
    if (userLikes.length === 1) {
        if (loggedUserIn) {
            return (
                <React.Fragment>
                    <div className="userlike-wrapper">
                        <img
                            className="userlike-picture--solo"
                            src={userLikes[0].avatarUrl}
                        />
                    </div>
                    <p className="userlike-by">Liked by <span>you</span></p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="userlike-wrapper">
                        <img
                            className="userlike-picture--solo"
                            src={userLikes[0].avatarUrl}
                        />
                    </div>
                    <p className="userlike-by">
                        Liked by <span>{userLikes[0].username}</span>
                    </p>
                </React.Fragment>
            );
        }
    } else if (userLikes.length === 2) {
        if (loggedUserIn) {
            return (
                <React.Fragment>
                    <div className="userlike-wrapper">
                        <img
                            className="userlike-picture--duo__1"
                            src={userLikes[0].avatarUrl}
                        />
                        <img
                            className="userlike-picture--duo__2"
                            src={userLikes[1].avatarUrl}
                        />
                    </div>
                    <p className="userlike-by">
                        Liked by <span>{userLikes[0].username === loggedUser.username ? "you" : userLikes[0].username}</span> and <span>{userLikes[1].username === loggedUser.username ? "you" : userLikes[1].username}</span>
                    </p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="userlike-wrapper">
                        <img
                            className="userlike-picture--duo__1"
                            src={userLikes[0].avatarUrl}
                        />
                        <img
                            className="userlike-picture--duo__2"
                            src={userLikes[1].avatarUrl}
                        />
                    </div>
                    <p className="userlike-by">
                        Liked by <span>{userLikes[0].username}</span> and <span>{userLikes[1].username}</span>
                    </p>
                </React.Fragment>
            )
        }
    } else {
        if (loggedUserIn){
            return (
                <React.Fragment>
                    <div className="userlike-wrapper">
                        <img
                            className="userlike-picture--trio__1"
                            src={userLikes[0].avatarUrl}
                        />
                        <img
                            className="userlike-picture--trio__2"
                            src={userLikes[1].avatarUrl}
                        />
                        <img
                            className="userlike-picture--trio__3"
                            src={userLikes[2].avatarUrl}
                        />
                    </div>
                    <p className="userlike-by">
                        Liked by <span>you</span> and <span>{userLikes.length - 1} others</span>
                    </p>
                </React.Fragment>
            )
        } else {
            const randomIndex = Math.floor(Math.random() * userLikes.length) 
            return (
                <React.Fragment>
                    <div className="userlike-wrapper">
                        <img
                            className="userlike-picture--trio__1"
                            src={userLikes[0].avatarUrl}
                        />
                        <img
                            className="userlike-picture--trio__2"
                            src={userLikes[1].avatarUrl}
                        />
                        <img
                            className="userlike-picture--trio__3"
                            src={userLikes[2].avatarUrl}
                        />
                    </div>
                    <p className="userlike-by">
                        Liked by <span>{userLikes[randomIndex].username}</span> and <span>{userLikes.length - 1} others</span>
                    </p>
                </React.Fragment>
            )
        }
    }
    return null;
    // const userLikes = userLikesInState.filter(user => {
    //     for (let userId of likes){
    //         if (user.userId == userId){
    //             return user
    //         }
    //     }
    // })
    // console.log('rendering')
    // console.log(userLikes)
    // const isLoading = useSelector((state) => state.profileFeedData.isLoading);
    // console.log(isLoading)
    // const loggedUser = useSelector((state) => state.loggedUser.userData);
    // let loggedUserIn = userLikes.find(
    //     (userObj) => userObj.userId === loggedUser.userId
    // );
    // useEffect(() => {
    //     loggedUserIn = userLikes.find(
    //         (userObj) => userObj.userId === loggedUser.userId
    //     );
    // }, [likes]);

    // if (isLoading) {
    //     return <span>Loading...</span>;
    // }

    // if (userLikes.length === 1) {
    //     if (loggedUserIn) {
    //         return (
    //             <React.Fragment>
    //                 <div className="userlike-wrapper">
    //                     <img
    //                         className="userlike-picture--solo"
    //                         src={userLikes[0].avatarUrl}
    //                     />
    //                 </div>
    //                 <p className="userlike-by">Liked by you</p>
    //             </React.Fragment>
    //         );
    //     } else {
    //         return (
    //             <React.Fragment>
    //                 <div className="userlike-wrapper">
    //                     <img
    //                         className="userlike-picture--solo"
    //                         src={userLikes[0].avatarUrl}
    //                     />
    //                 </div>
    //                 <p className="userlike-by">
    //                     Liked by <span>{userLikes[0].username}</span>
    //                 </p>
    //             </React.Fragment>
    //         );
    //     }
    // } else if (userLikes.length === 2) {
    //     if (loggedUserIn) {
    //         return (
    //             <React.Fragment>
    //                 <div className="userlike-wrapper">
    //                     <img
    //                         className="userlike-picture--duo__1"
    //                         src={userLikes[0].avatarUrl}
    //                     />
    //                     <img
    //                         className="userlike-picture--duo__2"
    //                         src={userLikes[1].avatarUrl}
    //                     />
    //                 </div>
    //                 <p className="userlike-by">
    //                     Liked by <span>{userLikes[0].username === loggedUser.username ? "you" : userLikes[0].username}</span> and <span>{userLikes[1].username === loggedUser.username ? "you" : userLikes[1].username}</span>
    //                 </p>
    //             </React.Fragment>
    //         );
    //     } else {
    //         return (
    //             <React.Fragment>
    //                 <div className="userlike-wrapper">
    //                     <img
    //                         className="userlike-picture--duo__1"
    //                         src={userLikes[0].avatarUrl}
    //                     />
    //                     <img
    //                         className="userlike-picture--duo__2"
    //                         src={userLikes[1].avatarUrl}
    //                     />
    //                 </div>
    //                 <p className="userlike-by">
    //                     Liked by <span>{userLikes[0].username}</span> and <span>{userLikes[1].username}</span>
    //                 </p>
    //             </React.Fragment>
    //         )
    //     }
    // } else {
    //     if (loggedUserIn){
    //         return (
    //             <React.Fragment>
    //                 <div className="userlike-wrapper">
    //                     <img
    //                         className="userlike-picture--trio__1"
    //                         src={userLikes[0].avatarUrl}
    //                     />
    //                     <img
    //                         className="userlike-picture--trio__2"
    //                         src={userLikes[1].avatarUrl}
    //                     />
    //                     <img
    //                         className="userlike-picture--trio__3"
    //                         src={userLikes[2].avatarUrl}
    //                     />
    //                 </div>
    //                 <p className="userlike-by">
    //                     Liked by <span>you</span> and <span>{userLikes.length - 1} others</span>
    //                 </p>
    //             </React.Fragment>
    //         )
    //     } else {
    //         const randomIndex = Math.floor(Math.random() * userLikes.length) 
    //         return (
    //             <React.Fragment>
    //                 <div className="userlike-wrapper">
    //                     <img
    //                         className="userlike-picture--trio__1"
    //                         src={userLikes[0].avatarUrl}
    //                     />
    //                     <img
    //                         className="userlike-picture--trio__2"
    //                         src={userLikes[1].avatarUrl}
    //                     />
    //                     <img
    //                         className="userlike-picture--trio__3"
    //                         src={userLikes[2].avatarUrl}
    //                     />
    //                 </div>
    //                 <p className="userlike-by">
    //                     Liked by <span>{userLikes[randomIndex].username}</span> and <span>{userLikes.length - 1} others</span>
    //                 </p>
    //             </React.Fragment>
    //         )
    //     }
    // }
}
