import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "./userpictureslist.scss";

export default function UserPicturesList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/user/')
            .then(res => res.json())
            .then(result => {
                if (result.status === 'OK'){
                    setUsers(result.data)
                }
            })
    }, [])

    const renderUsersList = users.map((user) => {
        return (
            <div key={user._id}>
                <p>{user.username}</p>
                <Link to={`/photowall/${user._id}`}>see profile</Link>
            </div>
        )
    })
    if (!users) return <p>Loading data</p>;

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            List of users
            {renderUsersList}
        </div>
    );
}
