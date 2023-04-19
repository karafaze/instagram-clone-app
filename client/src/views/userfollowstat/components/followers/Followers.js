import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getItemsFromLocalStorage } from "../../../../utils/localStorageToken";

import UserCard from "../usercard/UserCard";

import "./followers.scss";

export default function Followers({showFollowers}) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false)
    const followers = useSelector(state => {
        if (showFollowers){
            return state.profile.userData.followedBy
        } else {
            return state.profile.userData.following
        }
    });

    useEffect(() => {
        if (followers){
            setLoading(true)
            const { token } = getItemsFromLocalStorage();
            const urls = followers?.map((id) => {
                return fetch(`/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            });
            if (urls){
                Promise.all(urls)
                    .then((responses) => Promise.all(responses.map((res) => res.json())))
                    .then((results) => {
                        let updatedList = [];
                        results.forEach((user) => {
                            if (user.status === "OK") {
                                updatedList.push(user.data)
                            } else {
                                setUsers(null);
                                throw Error("Something went wrong");
                            }
                        });
                        setUsers(updatedList);
                        
                    })
                    .catch((err) => console.log(err));
            }
        }
        setLoading(false)
    }, [followers]);

    if (loading) return <p>Waiting for data to come...</p>
    if (users){
        return (
            <div className="follow">
                { users.map(user => {
                    return (
                        <UserCard key={user.userId} user={user}/>
                    )
                })}
            </div>
        )
    }
}
