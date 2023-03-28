import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AuthGard from "./routes/AuthGard";

import "./app.scss";

export default function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route
                    path="/photowall/*"
                    element={
                        <AuthGard>
                            <PrivateRoutes />
                        </AuthGard>
                    }
                ></Route>
            </Routes>
        </React.Fragment>
    );
}
