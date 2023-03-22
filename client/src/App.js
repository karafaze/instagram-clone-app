import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./views/login/Login";
import Register from "./views/register/Register";
import UserProfile from "./views/userprofile/UserProfile";
// import Feed from "./views/feed/Feed";

import "./app.scss";

export default function App() {
    const [user, setUser] = useState(null);
    // const [user, setUser] = useState(null);
    // useEffect(() => {
    //     fetch("http://localhost:3001/")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //             setUser(data.username);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <React.Fragment>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={user ? <UserProfile /> : <Navigate to="/login"/>}
                />
            </Routes>
        </React.Fragment>
    );
}
