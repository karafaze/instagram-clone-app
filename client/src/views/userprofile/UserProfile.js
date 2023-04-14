import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedUserDetails } from "../../redux/actions/loggedUserActions";
import { fetchProfileDetails } from "../../redux/actions/profileActions";

import { getItemsFromLocalStorage } from "../../utils/localStorageToken";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserInfo from "../../components/userinfo/UserInfo";
import UserPicturesList from "../../components/userpictureslist/UserPictureList";
import Error from '../../views/error/Error';

import "./userprofile.scss";

export default function UserProfile() {
    // requestedUserId : the user we currently want to check the profile page
    const { userId: requestedUserId } = useParams();
    // authenticatedUserId : the user who is currently logged in
    const { userId: authenticatedUserId } = getItemsFromLocalStorage();

    const isLoggedUser = (requestedUserId === authenticatedUserId)
    const error = useSelector(state => state.profile.hasError)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedUserDetails(authenticatedUserId));
        dispatch(fetchProfileDetails(requestedUserId));
    }, [dispatch, authenticatedUserId, requestedUserId]);

    if (error){
        return <Error />
    }
    return (
        <React.Fragment>
            <Header />
            <main className="userprofile-page">
                <UserInfo isLoggedUser={isLoggedUser}/>
                <UserPicturesList />
            </main>
            <Footer />
        </React.Fragment>
    );
}
