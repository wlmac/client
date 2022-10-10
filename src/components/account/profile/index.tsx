import * as React from "react";
import { Link, useParams } from "react-router-dom";
import User from "../../../util/core/interfaces/user";

export const Profile = (): JSX.Element => {
    const { username } = useParams();

    const user: User = {
        id: 0,
        slug: username!,
        name: ["name", "name"],
        bio: "I love metropolis",
        timezone: "EST",
        graduatingYear: 2023,
        organizations: [],
        following: [],
    };

    return (
        <>
            <link rel="stylesheet" href="/static/css/profile/detail.css" />
            <link rel="stylesheet" href="/static/css/secondary.css" />
            <div className="container">
                <ul className="sidenav secondnav" id="secondary-out">
                    <li>
                        <a className="sidenav-close" href="https://maclyonsden.com/accounts/profile">Profile</a>
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

                <a href="https://maclyonsden.com/user/ji.mmyliu#" data-target="secondary-out" className="sidenav-trigger secondnav-trigger"><i className="zmdi zmdi-menu"></i></a>

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
                            <Link className="link" to="/admin/core/announcement/add/">Announcements</Link>
                        </li>
                        <li>
                            <Link className="link" to="dmin/core/event/add/">Events</Link>
                        </li>
                        <hr />
                        <li>
                            <Link className="link" to="/accounts/logout/">Logout</Link>
                        </li>
                    </ul>
                </div>


                <div className="white-bg">
                    <div className="header">
                        <img className="circle responsive-img profile-picture" src="/img" alt={`${user.slug}'s profile picture`} />
                        <div className="name-info">
                            <h5 className="full-name">{user.name[0]} {user.name[1]}</h5>
                            <h6 className="username">{user.slug}</h6>
                        </div>

                        <div className="edit-button">
                            <i className="zmdi zmdi-fw-3x zmdi-edit"></i>
                            <Link to="/accounts/profile/update">Edit</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="body">
                        <div className="field">
                            <div className="label">Graduating</div><div>{user.graduatingYear}</div>
                        </div>
                        <div className="field">
                            <div className="label">Executive of</div>
                            Project Metropolis,&nbsp;
                            Mackenzie Computer Programming Team (MCPT)
                        </div>
                        <br />
                        <div>
                            This user has not shared any information.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}