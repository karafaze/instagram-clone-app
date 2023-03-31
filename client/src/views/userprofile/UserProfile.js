import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';

import { useDispatch } from "react-redux";
import { fetchAuthUserDetails } from "../../redux/actions/authUserActions";
import { fetchRandomUserDetails } from "../../redux/actions/randomUserActions";

import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserInfo from "../../components/userinfo/UserInfo";
import UserPicturesList from "../../components/userpictureslist/UserPictureList";

import "./userprofile.scss";

export default function UserProfile() {
    // requestedUserId : the user we currently want to check the profile page
    const {userId: requestedUserId} = useParams();
    // authenticatedUserId : the user who is currently logged in
    const {userId: authenticatedUserId} = getItemsFromLocalStorage();

    // will be send as a prop to indicated to components
    // whether to get authUser or randomUser data to fill in data
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(true)

    const dispatch = useDispatch();

    // below we fill authUser and randomUser with data from server
    useEffect(() => {
        // we always want to get data for authenticatedUser
        dispatch(fetchAuthUserDetails(authenticatedUserId));

        // in case requestedUser is not the same as authenticatedUserId
        // meaning logged user is visiting another profile page
        if (authenticatedUserId !== requestedUserId){
            // we set authenticatedUser to false
            // request data to server to fill randomUser state data
            setIsAuthenticatedUser(false);
            dispatch(fetchRandomUserDetails(requestedUserId))
        } else {
            setIsAuthenticatedUser(true)
        }
    }, [dispatch, authenticatedUserId, requestedUserId]);

    return (
        <React.Fragment>
            <Header />
            <main className="userprofile-page">
                <UserInfo isAuthenticatedUser={isAuthenticatedUser}/>
                <UserPicturesList isAuthenticatedUser={isAuthenticatedUser}/>
            </main>
            <Footer />
        </React.Fragment>
    );
}
