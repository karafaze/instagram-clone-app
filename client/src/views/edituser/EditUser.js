import React from 'react';
import { useParams } from 'react-router-dom';
import './edituser.scss';

export default function EditUser(){
    const {userId} = useParams()
    return <p>Editing user {userId}</p>
}