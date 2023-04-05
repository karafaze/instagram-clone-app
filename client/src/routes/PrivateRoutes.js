import { Routes, Route } from "react-router-dom";

import UserProfile from "../views/userprofile/UserProfile";
import Feed from "../views/feed/Feed";
import Error from '../components/error/Error';
import EditUser from "../views/edituser/EditUser";

export default function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/:userId" element={<UserProfile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/:userId/edit" element={<EditUser />} />
            <Route path="*" element={<Error />}/>
        </Routes>
    );
}
