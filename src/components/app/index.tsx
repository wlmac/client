import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NavigationBar } from "./navigation";
import { Home } from "../home";
import { Announcements } from "../announcements";
import { NotFound } from "../notfound";

import M from 'materialize-css';
import "./index.scss";

export const Footer = () => {
    const nav = useNavigate();

    React.useEffect(() => {
        M.AutoInit();
    });

    return (
        <div className="footer">
            <div className="footer-title-par">
                <p className="footer-title">William Lyon Mackenzie's online hub for announcements, calendar events, clubs, and timetables.</p>
                <p className="footer-title"><a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></p>
            </div>
            <hr className="footer-bar"></hr>
            <div className="foooter-icon-par">
                <a className="footer-name" href="https://github.com/wlmac/metropolis" rel="noreferrer" target="_blank">
                    <i className="footer-icon zmdi zmdi-hc-3x zmdi-github"></i>
                </a>
            </div>
        </div>
    );
}

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