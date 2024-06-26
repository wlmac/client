import jwtDecode from "jwt-decode";
import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { getToken, loggedIn, logout } from "../../../util/core/AuthService";
import { Session, SessionContext } from "../../../util/core/session";
import { Theme, ThemeContext } from "../../../util/core/client/theme/ThemeContext";
import Routes from "../../../util/core/misc/routes";

export const NavigationBar = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const theme: Theme = React.useContext(ThemeContext)

    return (
        <>
            <ul className="sidenav" id="slide-out" style={{ transform: "translateX(-105%)" }}>
                <li className="divider"></li>
                <li>
                </li><li>
                    <NavLink href="/announcements?feed=all">All</NavLink>
                </li>
                <li>
                    <NavLink href="/announcements?feed=school">School</NavLink>
                </li>
                <li>
                    <NavLink href="/announcements?feed=sac">Student Council</NavLink>
                </li>
                <li className="divider"></li>
                <li>
                    <NavLink href="/calendar" className="sidenav-close">Calendar</NavLink>
                </li>
                <li>
                    <NavLink href="/clubs" className="sidenav-close">Clubs</NavLink>
                </li>
                <li>
                    <NavLink href="/blog" className="sidenav-close">Blog</NavLink>
                </li>
                <li>
                    <a href="https://doodle.maclyonsden.com" className="sidenav-close">Doodle</a>
                </li>
                <li>
                    <NavLink href="/resources" className="sidenav-close">Resources</NavLink>
                </li>
                <li>
                    <NavLink href="/map" className="sidenav-close">Map</NavLink>
                </li>
                <li className="divider"></li>
                <li>
                </li><li>
                    <NavLink href="/about?tab=history">WLMCI</NavLink>
                </li>
                <li>
                    <NavLink href="/about?tab=about">About</NavLink>
                </li>
                <li>
                    <NavLink href="/about?tab=team">Team</NavLink>
                </li>
                <li>
                    <NavLink href="/about?tab=school">Contact WLMCI</NavLink>
                </li>
                <li>
                    <NavLink href="/about?tab=contact">Contact Us</NavLink>
                </li>
                <li className="divider"></li>
                {
                    loggedIn() ?
                        <>
                            <li><NavLink href={`/user/${session.user.username}`} className="sidenav-close">Profile</NavLink></li>
                            <li><NavLink href={`/timetable`} className="sidenav-close">Timetable</NavLink></li>
                            {(session.user?.is_superuser || session.user?.organizations_leading && session.user?.organizations_leading?.length > 0 || session.user?.organizations_supervising && session.user?.organizations_supervising?.length > 0) && <li tabIndex={0}><a href={`${Routes.BASEURL}/admin/`}>Admin</a></li>}
                            <li><a className="nav-link" onClick={(ev: React.MouseEvent) => {
                                ev.preventDefault();
                                logout();
                                nav("/account/login");
                            }}>Logout</a></li>
                        </>
                        :
                        <>
                            <li><NavLink href="/account/login/?next=/" className="sidenav-close">Login</NavLink></li>
                            <li><NavLink href="/account/signup/?next=/" className="sidenav-close">Sign Up</NavLink></li>
                        </>
                }
            </ul>
            <nav>
                <div className="nav-wrapper">
                    <NavLink href="/">
                        <div className="brand-logo">
                            <img className="img-logo" src={theme.logo} />
                        </div>
                    </NavLink>

                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="zmdi zmdi-menu"></i></a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a className="dropdown-trigger" data-target="dropdownAnnouncements">Announcements<i className="zmdi zmdi-caret-down"></i></a>
                            <ul id="dropdownAnnouncements" className="dropdown-content">
                                <li>
                                    <NavLink href="/announcements?feed=all">All</NavLink>
                                </li>

                                <li>
                                    <NavLink href="/announcements?feed=school">School</NavLink>
                                </li>

                                <li>
                                    <NavLink href="/announcements?feed=sac">Student Council</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/calendar">Calendar</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/clubs">Clubs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/blog">Content</NavLink>
                        </li>
                        <li>
                            <a className="dropdown-trigger" href="/#!" data-target="dropdownAbout">More<i className="zmdi zmdi-caret-down"></i></a><ul id="dropdownAbout" className="dropdown-content">
                                <li>
                                    <NavLink href="/about?tab=history">About</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/map">Map</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/resources">Resources</NavLink>
                                </li>
                                <li>
                                    <a href="https://doodle.maclyonsden.com" className="nav-link">Doodle</a>
                                </li>
                            </ul>
                        </li>


                        <li>
                            {loggedIn() ?
                                <>
                                    <a className="dropdown-trigger" href="/user/ji.mmyliu#!" data-target="dropdownAcc">
                                        Account
                                        <i className="zmdi zmdi-caret-down"></i>
                                    </a>

                                    <ul id="dropdownAcc" className="dropdown-content" tabIndex={0}>
                                        <li tabIndex={0}><Link to={`/user/${session.user.username}`}>Profile</Link></li>
                                        <li tabIndex={0}><Link to="/timetable">Timetable</Link></li>
                                        {(session.user?.is_superuser || session.user?.organizations_leading && session.user?.organizations_leading?.length > 0 || session.user?.organizations_supervising && session.user?.organizations_supervising?.length > 0) && <li tabIndex={0}><a href={`${Routes.BASEURL}/admin/`}>Admin</a></li>}
                                        <li tabIndex={0}><Link to="/account/logout">Logout</Link></li>
                                    </ul>
                                </>
                                :
                                <>
                                    <a className="dropdown-trigger" href="/#!" data-target="dropdownAcc">
                                        Login/Sign Up<i className="zmdi zmdi-caret-down"></i>
                                    </a>

                                    <ul id="dropdownAcc" className="dropdown-content" >
                                        <li><RouterLink href="/account/login/?next=/">Login</RouterLink></li>
                                        <li><RouterLink href="/account/signup/?next=/">Sign Up</RouterLink></li>
                                    </ul>
                                </>
                            }
                        </li>
                    </ul>
                </div>
            </nav></>
    );
}

export const NavLink = (props: any) => {
    const nav: NavigateFunction = useNavigate();

    return (
        <a className="nav-link" href={props.href} onClick={(ev) => {
            ev.preventDefault();
            nav(props.href);
        }}>{props.children}</a>
    );
}

export const RouterLink = (props: any) => {
    const nav: NavigateFunction = useNavigate();

    return (
        <a href={props.href} className={props.className} onClick={(ev) => {
            ev.preventDefault();
            nav(props.href);
        }}>
            {props.children}
        </a>
    );
}
