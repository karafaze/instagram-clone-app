import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileDetails } from "../../redux/actions/profileActions";

import HeaderBack from "../../components/headerback/HeaderBack";
import Footer from "../../components/footer/Footer";

import Followers from "./components/followers/Followers";

import "./userfollowstat.scss";

export default function UserFollowStat() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.profile.userData);
    const [showFollowers, setShowFollowers] = useState(true);
    
    useEffect(() => {
        dispatch(fetchProfileDetails(userId));
    }, [dispatch, userId]);

    return (
        <React.Fragment>
            <HeaderBack>
                <span className="userfollowstat-page--username">
                    {userData?.username}
                </span>
            </HeaderBack>
            <main className="userfollowstat-page">
                <div className="userfollowstat-page--top">
                    <span 
                        className={showFollowers ? "is-active-tab" : ''}
                        onClick={() => setShowFollowers(true)}
                    >
                        Followers
                    </span>
                    <span 
                        className={!showFollowers ? "is-active-tab" : ''}
                        onClick={() => setShowFollowers(false)}
                    >
                        Following
                    </span>
                </div>
                <section className="userfollowstat-page--follow-list">
                    <Followers showFollowers={showFollowers} />
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
