import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "../../redux/actions/profileActions";
import {fetchProfilePostData} from '../../redux/actions/profilePostAction'
import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import NotFound from "../../views/notfound/NotFound";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";

import UserInfo from "./components/userinfo/UserInfo";
import UserPicturesList from "./components/userpictureslist/UserPictureList";

import "./userprofile.scss";

export default function UserProfile() {
    const dispatch = useDispatch();
    // requestedUserId : the user we currently want to check the profile page
    const { userId: requestedUserId } = useParams();
    // authenticatedUserId : the user who is currently logged in
    const { userId: authenticatedUserId } = getItemsFromLocalStorage();
    // create isLoggedUser to be sent as a prop to children components
    const isLoggedUser = requestedUserId === authenticatedUserId;

    // check if any errors occur during the loading of userprofile page
    // if so, we'll redirect to NotFound page
    const { hasError, isLoading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(fetchProfileDetails(requestedUserId));
        dispatch(fetchProfilePostData(requestedUserId))
    }, [dispatch, authenticatedUserId, requestedUserId]);

    if (hasError) {
        return <NotFound />;
    }

    return (
        <React.Fragment>
            <Header />
            <main className="userprofile-page">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <React.Fragment>
                        <UserInfo isLoggedUser={isLoggedUser} />
                        <UserPicturesList />
                    </React.Fragment>
                )}
            </main>
            <Footer />
        </React.Fragment>
    );
}
