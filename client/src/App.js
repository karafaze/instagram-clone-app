import React from "react";
import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AuthGard from "./routes/AuthGard";

import "./app.scss";

export default function App() {
    return (
        <React.Fragment>
            <Provider store={store}>
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
            </Provider>
        </React.Fragment>
    );
}
