import * as React from "react";
import { Link, NavigateFunction, useLocation, useNavigate, useParams } from "react-router-dom";
import { Session, SessionContext, User } from '../../../util/core/session';
import Routes from "../../../util/core/misc/routes";

export const ProfileNav = (): JSX.Element => {
    const { username } = useParams();
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    const current_user: User = session.user;
    const [user, setUser] = React.useState({} as User);
    const [notFound, setNotFound] = React.useState(false);

    const location = useLocation();

    const fetchUser = (): void => {
        if (!username) return;
        session.request('get', `${Routes.USER}/retrieve/${username}?lookup=username`).then((res) => {
            if (res) {
                const fetched_user: User = res.data as User;
                setUser(res.data);
                setNotFound(false);
            }
            else {
                setNotFound(true);
            }
        });
    }

    React.useEffect(() => {
        fetchUser();
    }, [location]);

    return (
        <div className="secondary-nav-wrapper">
            <ul className="secondary-nav">
                <li>
                    <Link className={`link${location.pathname.startsWith('/user/') ? ' current' : ''}`} to="/account/profile">Profile</Link>
                </li>
                <li>
                    <Link className={`link${location.pathname.startsWith('/timetable') ? ' current' : ''}`} to="/timetable">Timetable</Link>
                </li>
                <hr />
                {
                    notFound ?
                        console.log("Why you looing for ghosts huh?")
                    :
                        "username" in current_user ?
                            current_user.organizations_leading.length > 0 ?
                                <div>
                                    <li>
                                        <a className="link" href={`${Routes.BASEURL}/admin/core/announcement/add/`}>Announcements</a>
                                    </li>
                                    <li>
                                        <a className="link" href={`${Routes.BASEURL}/admin/core/event/add/`}>Events</a>
                                    </li>
                                    <hr />
                                </div>
                            :
                                ""
                        :
                            <div>
                                Loading...
                                <hr />
                            </div>
                }
                <li>
                    <Link className="link" to="/account/logout/">Logout</Link>
                </li>
            </ul>
        </div>
    );
}