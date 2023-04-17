import { Routes, Route } from "react-router-dom";

import Login from "../views/auth/login/Login";
import Register from "../views/auth/register/Register";
import NotFound from '../views/notfound/NotFound';

export default function PublicRoutes() {
    return (
        <Routes>
            <Route index element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />}/>
        </Routes>
    );
}
