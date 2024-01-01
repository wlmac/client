import * as React from "react";
import { Link, useLocation } from "react-router-dom";

export const ProfileNav = (): JSX.Element => {
    const location = useLocation();
    console.log(location);

    return (
        <div className="secondary-nav-wrapper">
            <ul className="secondary-nav">
                <li>
                    <Link className={`link${location.pathname.startsWith('/user/') ? ' current' : ''}`} to="/accounts/profile">Profile</Link>
                </li>
                <li>
                    <Link className={`link${location.pathname.startsWith('/timetable') ? ' current' : ''}`} to="/timetable">Timetable</Link>
                </li>
                <hr />
                <li>
                    <Link className="link" to="/admin/core/announcement/add/">Announcements</Link>
                </li>
                <li>
                    <Link className="link" to="/admin/core/event/add/">Events</Link>
                </li>
                <hr />
                <li>
                    <Link className="link" to="/accounts/logout/">Logout</Link>
                </li>
            </ul>
        </div>
    );
}