import { Routes, Route } from "react-router-dom";

import UserProfile from "../views/userprofile/UserProfile";
import Feed from "../views/feed/Feed";
import Error from '../components/error/Error';

export default function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/:username" element={<UserProfile />} />
            <Route path="/feed" element={<Feed />} />

            <Route path="*" element={<Error />}/>
        </Routes>
    );
}
