import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchLoggedUserDetails } from "../../redux/actions/loggedUserActions";
import { fetchProfileDetails } from "../../redux/actions/profileActions";

import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserInfo from "../../components/userinfo/UserInfo";
import UserPicturesList from "../../components/userpictureslist/UserPictureList";

import "./userprofile.scss";

export default function UserProfile() {
    // requestedUserId : the user we currently want to check the profile page
    const { userId: requestedUserId } = useParams();
    // authenticatedUserId : the user who is currently logged in
    const { userId: authenticatedUserId } = getItemsFromLocalStorage();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedUserDetails(authenticatedUserId));
        dispatch(fetchProfileDetails(requestedUserId));
        // in case requestedUser is not the same as authenticatedUserId
        // meaning logged user is visiting another profile page
        // if (!isAuthenticatedUser){
        //     // we set authenticatedUser to false
        //     // request data to server to fill randomUser state data
        //     console.log('we fetch data for random user now')
        //     setIsAuthenticatedUser(requestedUserId === authenticatedUserId);
        //     dispatch(fetchRandomUserDetails(requestedUserId))
        // } else {
        //     setIsAuthenticatedUser(requestedUserId === authenticatedUserId)
        // }
    }, [dispatch, authenticatedUserId, requestedUserId]);

    return (
        <React.Fragment>
            <Header />
            <main className="userprofile-page">
                <UserInfo />
                <UserPicturesList />
            </main>
            <Footer />
        </React.Fragment>
    );
}
