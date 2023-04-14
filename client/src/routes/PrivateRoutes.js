import { Routes, Route } from "react-router-dom";

import UserProfile from "../views/userprofile/UserProfile";
import Feed from "../views/feed/Feed";
import Error from '../views/error/Error';
import EditUser from "../views/edituser/EditUser";
import Search from '../views/search/Search';

export default function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/:userId" element={<UserProfile />} />
            <Route path="/:userId/feed" element={<Feed />} />
            <Route path="/:userId/edit" element={<EditUser />} />
            <Route path="/search" element={<Search />}/>
            <Route path="*" element={<Error />}/>
        </Routes>
    );
}
