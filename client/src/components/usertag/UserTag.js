import React from 'react';
import { useSelector } from 'react-redux';
import './usertag.scss';

export default function UserTag(){
    const userDetail = useSelector(state => state.profile)

    return (
        <h2 className="top--data__username">{userDetail?.userData.username || 'loading'}</h2>
    )
}