import * as React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Session, SessionContext, User } from "../../../util/core/session";
import Routes from "../../../util/core/misc/routes";
import Organization from "../../../util/core/interfaces/organization";
import { get_gravatar_uri } from "../../../util/core/misc/gravatar";
import { ProfileNav } from "../left-nav";
import { loggedIn } from "../../../util/core/AuthService";
import { LoginRequired } from "../../../util/login-required";

export const Profile = (props: { children?: JSX.Element }): JSX.Element => {
    return (
        <LoginRequired>
            <>
                <link rel="stylesheet" href="/static/css/profile/detail.css" />
                <link rel="stylesheet" href="/static/css/secondary.css" />
                <div className="container">
                    <ul className="sidenav secondnav" id="secondary-out">
                        <li>
                            <Link className="sidenav-close" to="/accounts/profile">Profile</Link>
                        </li>
                        <li>
                            <Link className="sidenav-close" to="/timetable">Timetable</Link>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <Link className="link sidenav-close" to="/admin/core/announcement/add/">Add
                                announcement</Link>
                        </li>
                        <li>
                            <Link className="link sidenav-close" to="/admin/core/event/add/">Add event</Link>
                        </li>
                        <li className="divider"></li>
                        <li><Link to="/accounts/logout/" className="sidenav-close">Logout</Link></li>
                    </ul>

                    <ProfileNav />

                    <div className="white-bg">
                        {props.children}
                    </div>
                </div>
            </>
        </LoginRequired>
    );
}