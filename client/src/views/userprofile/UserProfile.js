import React from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserInfo from "../../components/userinfo/UserInfo";
import UserPicturesList from "../../components/userpictureslist/UserPictureList";

import "./userprofile.scss";

export default function UserProfile() {
    const {username} = useParams()
    console.log(username)
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
