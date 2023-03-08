import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import { NavigationBar } from "./navigation";
import { Footer } from "./footer";
import { Home } from "../home";
import { Announcements } from "../announcements";
import { NotFound } from "../notfound";
import { Resources } from "../resources";
import { About } from "../about";
import { Clubs } from "../clubs";
import { Calendar } from "../calendar"

import { Login } from "../auth/login";
import { Register } from "../auth/register";

import M from 'materialize-css';
import "./index.scss";
import { Blog } from "../blog";
import { SessionProvider } from "../../util/core/session";
import { Profile } from "../account/profile";
import { Flatpage } from "../flatpage";
import { ClubDetails } from "../clubs/details";
import { EditClubDetails } from "../clubs/details/edit";
import { BlogDetails } from "../blog/details";
import { AnnouncementDetail } from "../announcements/detail";

export const _App = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    React.useEffect((): void => {
        M.AutoInit();
    });

    return (
        <div className="page">
            <NavigationBar />

            <div className="router-outlet">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/announcement/:id" element={<AnnouncementDetail />} />
                    {/* <Route path="/calendar" element={<Calendar />} /> */}
                    <Route path="/clubs" element={<Clubs />} />
                    <Route path="/club/:id" element={<ClubDetails />} />
                    <Route path="/club/edit/:id" element={<EditClubDetails />} />

                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />

                    <Route path="/about" element={<About />}>
                        <Route path=":page" element={<About />} />
                    </Route>

                    <Route path="/map" />

                    <Route path="/accounts/login" element={<Login />} />
                    <Route path="/accounts/signup" element={<Register />} />

                    <Route path="/user/:userID" element={<Profile />} />

                    <Route path="*" element={<Flatpage />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <SessionProvider>
                <_App />
            </SessionProvider>
        </BrowserRouter>
    );
}
