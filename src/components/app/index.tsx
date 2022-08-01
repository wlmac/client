import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NavigationBar } from "./navigation";
import { Footer } from "./footer";
import { Home } from "../home";
import { Announcements } from "../announcements";
import { NotFound } from "../notfound";

import M from 'materialize-css';
import "./index.scss";

export const _App = () => {
    const nav = useNavigate();

    return (
        <div className="page">
            <NavigationBar />

            <div className="router-outlet">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/announcements" element={<Announcements />} />
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