import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "../home";
import { Announcements } from "../announcements";
import { NotFound } from "../notfound";

import "./index.scss";

export const NavigationBar = () => {
    const nav = useNavigate();

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/">
                    <div className="brand-logo">
                        <img className="img-logo" src=""></img>
                    </div>
                </a>
                    
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="zmdi zmdi-menu"></i></a>
                <ul className="right hide-on-med-and-down">
                    <li className="nav-item">
                        <a className="nav-link" href="{{ items }}" onClick={(ev)=>{
                            ev.preventDefault();
                            nav("/");
                        }}>Link</a>
                    </li>
                    <li>
                        <a className="dropdown-trigger" href="#!" data-target="dropdown{{ heading }}">Announcements<i className="zmdi zmdi-caret-down"></i></a>
                        <ul id="dropdown{{ heading }}" className="dropdown-content">
                            <li>
                                <a href="/announcements">Announcements</a>
                            </li>
                        </ul>
                    </li>
                    <li><a className="dropdown-trigger" href="#!" data-target="dropdownAcc">
                        Login/Sign Up
                        <i className="zmdi zmdi-caret-down"></i>
                    </a></li>
                </ul>
            </div>
        </nav>
    );
}

export const Footer = () => {
    const nav = useNavigate();

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