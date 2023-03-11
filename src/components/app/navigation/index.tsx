import jwtDecode from "jwt-decode";
import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { getToken, loggedIn } from "../../../util/core/AuthService";
import { Session, SessionContext } from "../../../util/core/session";

export const NavigationBar = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

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
                    <NavLink href="/blog" className="sidenav-close">Content</NavLink>
                </li>
                <li>
                    <NavLink href="/resources" className="sidenav-close">Resources</NavLink>
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
                    <NavLink href="/map">Map</NavLink>
                </li>
                <li>
                    <NavLink href="/about?tab=school">Contact WLMCI</NavLink>
                </li>
                <li>
                    <NavLink href="/about?tab=contact">Contact Us</NavLink>
                </li>
                <li className="divider"></li>
                <li><NavLink href="/accounts/login/?next=/" className="sidenav-close">Login</NavLink></li>
                <li><NavLink href="/accounts/signup/?next=/" className="sidenav-close">Sign Up</NavLink></li>
            </ul>
            <nav>
                <div className="nav-wrapper">
                    <NavLink href="/">
                        <div className="brand-logo">
                            <img className="img-logo" src="/static/img/themes/logos/dark-transparent.png" />
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
                        <li className="nav-item">
                            <NavLink href="/resources">Resources</NavLink>
                        </li>
                        <li>
                            <a className="dropdown-trigger" href="/#!" data-target="dropdownAbout">About<i className="zmdi zmdi-caret-down"></i></a><ul id="dropdownAbout" className="dropdown-content">
                                <li>
                                    <NavLink href="/about?tab=history">WLMCI</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/about?tab=about">About</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/about?tab=team">Team</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/map">Map</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/about?tab=school">Contact WLMCI</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/about?tab=contact">Contact Us</NavLink>
                                </li>
                            </ul>
                        </li>


                        <li>
                            {loggedIn() ?
                                <>
                                    <a className="dropdown-trigger" href="https://maclyonsden.com/user/ji.mmyliu#!" data-target="dropdownAcc">
                                        Account
                                        <i className="zmdi zmdi-caret-down"></i>
                                    </a>

                                    <ul id="dropdownAcc" className="dropdown-content" tabIndex={0}>
                                        <li tabIndex={0}><Link to={`/user/${session.user.id}`}>Profile</Link></li>
                                        <li tabIndex={0}><Link to="/timetable">Timetable</Link></li>
                                        {session.user.is_staff && <li tabIndex={0}><a href="/admin/">Admin</a></li>}
                                        <li tabIndex={0}><a onClick={(ev: React.MouseEvent) => {
                                            ev.preventDefault();
                                            session.logout();
                                        }}>Logout</a></li>
                                    </ul>
                                </>
                                :
                                <>
                                    <a className="dropdown-trigger" href="/#!" data-target="dropdownAcc">
                                        Login/Sign Up<i className="zmdi zmdi-caret-down"></i>
                                    </a>

                                    <ul id="dropdownAcc" className="dropdown-content" >
                                        <li><RouterLink href="/accounts/login/?next=/">Login</RouterLink></li>
                                        <li><RouterLink href="/accounts/signup/?next=/">Sign Up</RouterLink></li>
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
