import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NavigationBar } from "./navigation";
import { Footer } from "./footer";
import { Home } from "../home";
import { Announcements } from "../announcements";
import { NotFound } from "../notfound";
import { Resources } from "../resources";

import { Login } from "../auth/login";

import M from 'materialize-css';
import "./index.scss";

export const _App = () => {
    const nav = useNavigate();

    React.useEffect(() => {
        M.AutoInit();
    });

    return (
        <div className="page">
            <NavigationBar />

            <div className="router-outlet">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/resources" element={<Resources />} />

                    <Route path="/accounts/login" element={<Login />} />
                    {/* <Route path="/accounts/register" element={<Register />} /> */}

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export const App = () => {
    return (
        <BrowserRouter>
            <_App />
        </BrowserRouter>
    );
}