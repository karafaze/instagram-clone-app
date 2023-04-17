import React from 'react';
import { useSelector } from 'react-redux';

import './usertag.scss';

export default function UserTag(){
    const userData = useSelector(state => state.profile.userData)
    return (
        <h2 className="top--data__username">{userData?.username || ""}</h2>
    )
}