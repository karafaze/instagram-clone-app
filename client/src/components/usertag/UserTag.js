import React from 'react';
import { useSelector } from 'react-redux';
import './usertag.scss';

export default function UserTag({isAuthenticatedUser}){
    const userDetail = useSelector(state => isAuthenticatedUser ? state.authUser : state.randomUser)

    return (
        <h2 className="top--data__username">{userDetail?.userData.username || 'loading'}</h2>
    )
}