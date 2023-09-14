import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate, NavigateFunction, useLocation } from "react-router-dom";
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
import { Session, SessionContext, SessionProvider } from "../../util/core/session";
import { Profile } from "../account/profile";
import { Flatpage } from "../flatpage";
import { ClubDetails } from "../clubs/details";
import { EditClubDetails } from "../clubs/details/edit";
import { BlogDetails } from "../blog/details";
import { AnnouncementDetail } from "../announcements/detail";
import { Logout } from "../auth/logout";
import { TimetablePage } from "../account/timetable";
import Map from "../map";
import { ProfileView } from "../account/profile/view";
import { ProfileEdit } from "../account/profile/edit";
import { TimetableEdit } from "../account/timetable/edit";
import { Alert, Snackbar } from "@mui/material";
import { NewCourse } from "../account/timetable/edit/new-course";
import { LoginRequired } from "../../util/login-required";
import { MyProfile } from "../account/profile/my-profile";

export const _App = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const location = useLocation();

    React.useEffect((): void => {
        M.AutoInit();
    }, []);

    React.useEffect((): void => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <div className="page" style={{backgroundColor: "white"}}>
                <NavigationBar />

                <div className="router-outlet">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/announcements" element={<Announcements />} />
                        <Route path="/announcement/:id" element={<AnnouncementDetail />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/clubs" element={<Clubs />} />
                        <Route path="/club/:slug" element={<ClubDetails />} />
                        <Route path="/club/edit/:slug" element={
                            <LoginRequired>
                                <EditClubDetails />
                            </LoginRequired>
                        } />

                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetails />} />

                        <Route path="/about" element={<About />}>
                            <Route path=":page" element={<About />} />
                        </Route>

                        <Route path="/map" element={<Map />} />

                        <Route path="/accounts/login" element={<Login />} />
                        <Route path="/accounts/signup" element={<Register />} />
                        <Route path="/accounts/logout" element={<Logout />} />

                        <Route path="/timetable" element={<TimetablePage />} />
                        <Route path="/timetable/edit/:ID" element={
                            <Profile>
                                <TimetableEdit />
                            </Profile>
                        } />
                        <Route path="/course/add/term/:ID" element={
                            <Profile>
                                <NewCourse />
                            </Profile>
                        } />

                        <Route path="/user/:username" element={
                            <Profile>
                                <ProfileView />
                            </Profile>
                        } />

                        <Route path="/accounts/profile/update" element={
                            <Profile>
                                <ProfileEdit />
                            </Profile>
                        } />

                        <Route path="/accounts/profile" element={
                            <LoginRequired>
                                <MyProfile />
                            </LoginRequired>
                        } />

                        <Route path="*" element={<Flatpage />} />
                    </Routes>
                </div>

                <Footer />
            </div>
            <Snackbar open={session.notification.open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={session.closeNotif}>
                <Alert onClose={session.closeNotif} severity={session.notification.type} sx={{ width: '100%' }}>
                    {session.notification.message}
                </Alert>
            </Snackbar>
        </>
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
