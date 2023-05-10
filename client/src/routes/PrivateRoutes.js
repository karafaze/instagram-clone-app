import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getItemsFromLocalStorage } from "../utils/localStorageToken";
import { fetchLoggedUserDetails } from "../redux/actions/loggedUserActions";

import UserProfile from "../views/userprofile/UserProfile";
import Feed from "../views/feed/Feed";
import NotFound from "../views/notfound/NotFound";
import EditUser from "../views/edituser/EditUser";
import Search from "../views/search/Search";
import UserFollowStat from "../views/userfollowstat/UserFollowStat";
import AddPost from "../views/addpost/AddPost";

export default function PrivateRoutes() {
    const dispatch = useDispatch();
    useEffect(() => {
        const { userId } = getItemsFromLocalStorage();
        dispatch(fetchLoggedUserDetails(userId));
    }, [dispatch]);
    return (
        <Routes>
            <Route path="/:userId" element={<UserProfile />} />
            <Route path="/:userId/feed" element={<Feed />} />
            <Route path="/:userId/edit" element={<EditUser />} />
            <Route path="/:userId/follow" element={<UserFollowStat />} />
            <Route path="/:userId/addpost" element={<AddPost />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
