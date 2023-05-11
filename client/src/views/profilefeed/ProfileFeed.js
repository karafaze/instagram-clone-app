import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileDetails } from "../../redux/actions/profileActions";
import { fetchProfilePostData } from "../../redux/actions/profilePostAction";

import HeaderBack from "../../components/headerback/HeaderBack";
import NotFound from "../notfound/NotFound";

import "./profilefeed.scss";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";
import ProfileFeedList from "./components/profilefeedlist/ProfileFeedList";

export default function ProfileFeed() {
    const { userId: requestedUserId } = useParams();
    const dispatch = useDispatch();
    const {hasError, userData, isLoading} = useSelector(state => state.profile)
    useEffect(() => {
        dispatch(fetchProfileDetails(requestedUserId))
        dispatch(fetchProfilePostData(requestedUserId))
    }, [requestedUserId, dispatch])

    if (hasError) {
        return <NotFound />;
    } else if (isLoading){
        return <LoadingSpinner />
    } else {
        return (
            <React.Fragment>
                <HeaderBack><span className="profilefeed--username">{userData.username}</span></HeaderBack>
                <main className="profilefeed-page">
                    <ProfileFeedList />
                </main>
            </React.Fragment>
        );
    }


}
