import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Session, SessionContext, User } from "../../../util/core/session";
import Routes from "../../../util/core/misc/routes";
import Organization from "../../../util/core/interfaces/organization";
import { get_gravatar_uri } from "../../../util/core/misc/gravatar";

export const Profile = (): JSX.Element => {
    const { userID } = useParams();
    const session: Session = React.useContext(SessionContext);
    const current_user: User = session.user;
    const [user, setUser] = React.useState({} as User);
    const [organizations, setOrganizations] = React.useState([] as Array<Organization>);
    const [organizationDisplay, setOrganizationDisplay] = React.useState("");

    React.useEffect(() => {
        document.title = `User ${user.username} | Metropolis`;
        session.getAPI(`${Routes.USER}/${userID}`, true).then((res) => {
            const fetched_user: User = res.data as User;
            setUser(res.data);
            console.log("Fetched user:", fetched_user);

            session.getAPI(`${Routes.OBJECT}/organization`, false).then((res) => {
                const all_organizations = res.data.results as Array<Organization>;
                const organization_display_list: Array<string> = [];
                all_organizations.forEach((organization: Organization) => {
                    if (fetched_user.organizations.find(element => element === organization.id)) {
                        organization_display_list.push(organization.name);
                    }
                });
                setOrganizationDisplay(organization_display_list.join(", "));
            }).catch((err) => {

            });
        }).catch(() => {
            session.refreshAuth();
        });
    }, []);

    return (
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

                <a href="/user/ji.mmyliu#" data-target="secondary-out" className="sidenav-trigger secondnav-trigger"><i className="zmdi zmdi-menu"></i></a>

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
                        <img className="circle responsive-img profile-picture" src={get_gravatar_uri(user.email_hash)} alt={`${user.username}'s profile picture`} />
                        <div className="name-info">
                            <h5 className="full-name">{user.first_name} {user.last_name}</h5>
                            <h6 className="username">{user.username}</h6>
                        </div>

                        <div className="edit-button">
                            <i className="zmdi zmdi-fw-3x zmdi-edit"></i>
                            <Link to="/accounts/profile/update">Edit</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="body">
                        <div className="field">
                            <div className="label">Graduating</div><div>{user.graduating_year}</div>
                        </div>
                        <div className="field">
                            <div className="label">Executive of</div>
                            {organizationDisplay}
                        </div>
                        <br />
                        <div>
                            {user.bio ?
                                <p>{user.bio}</p>
                                :
                                <p>This user has not shared any information.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}