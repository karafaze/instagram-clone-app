import { Routes, Route } from "react-router-dom";

import Login from "../views/login/Login";
import Register from "../views/register/Register";
import Error from '../components/error/Error';

export default function PublicRoutes() {
    return (
        <Routes>
            <Route index element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Error />}/>
        </Routes>
    );
}
