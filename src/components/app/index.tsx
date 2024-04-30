import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate, NavigateFunction, useLocation, Link } from "react-router-dom";
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
import { TimetableEdit, TimetableAdd } from "../account/timetable/edit";
import { Alert, Snackbar } from "@mui/material";
import { Theme, ThemeContext, ThemeProvider } from '../../util/core/client/theme/ThemeContext'
import { NewCourse } from "../account/timetable/edit/new-course";
import { LoginRequired } from "../../util/login-required";
import { MyProfile } from "../account/profile/my-profile";
import { DeletionNotification } from "./delete-component";

import * as URLRoutes from "../../util/core/misc/routes";

export const _App = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const theme: Theme = React.useContext(ThemeContext);
    const location = useLocation();

    React.useEffect((): void => {
        M.AutoInit();
    }, []);

    React.useEffect((): void => {
        window.scrollTo(0, 0);
    }, [location]);

    const onRestore = (): void => {
        session.request('post', `${URLRoutes.default.USER}/me/restore`).then((res) => {
            session.refreshUser();
            window.location.reload();
        }).catch((err) => {
            alert("failed to restore account - please contact us!")
        })
    }

    return (
        <>
            <link rel="stylesheet" href={theme.bannerPath} />
            <link rel="stylesheet" href={theme.palettePath} />
            <div className="page" style={{backgroundColor: "white"}}>
                {session.user?.is_deleted ? <DeletionNotification onRestore={onRestore} /> : <></>}
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

                        <Route path="/account/login" element={<Login />} />
                        <Route path="/account/signup" element={<Register />} />
                        <Route path="/account/logout" element={<Logout />} />

                        <Route path="/timetable" element={<TimetablePage />} />
                        <Route path="/timetable/edit/:ID" element={
                            <Profile>
                                <TimetableEdit />
                            </Profile>
                        } />
                        <Route path="/timetable/add/:ID" element={
                            <Profile>
                                <TimetableAdd />
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

                        <Route path="/account/profile/update" element={
                            <Profile>
                                <ProfileEdit />
                            </Profile>
                        } />

                        <Route path="/account/profile" element={
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
                <ThemeProvider>
                    <_App />
                </ThemeProvider>
            </SessionProvider>
        </BrowserRouter>
    );
}
