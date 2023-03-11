import * as React from "react";
import { Link } from "react-router-dom";

export const ProfileNav = (): JSX.Element => {
    return (
        <div className="secondary-nav-wrapper">
            <ul className="secondary-nav">
                <li>
                    <Link className="link current" to="/accounts/profile">Profile</Link>
                </li>
                <li>
                    <Link className="link" to="/timetable">Timetable</Link>
                </li>
                <hr />
                <li>
                    <a className="link" href="/admin/core/announcement/add/">Announcements</a>
                </li>
                <li>
                    <a className="link" href="/admin/core/event/add/">Events</a>
                </li>
                <hr />
                <li>
                    <Link className="link" to="/accounts/logout/">Logout</Link>
                </li>
            </ul>
        </div>
    );
}