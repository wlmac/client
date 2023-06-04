import * as React from "react";
import { Session, SessionContext, User } from "../../../../util/core/session";
import { Link, NavigateFunction, useLocation, useNavigate, useParams } from "react-router-dom";
import Organization from "../../../../util/core/interfaces/organization";
import Routes from "../../../../util/core/misc/routes";
import { loggedIn } from "../../../../util/core/AuthService";
import Markdown from "../../../markdown";

export const ProfileView = (): JSX.Element => {
    const [organizationDisplay, setOrganizationDisplay] = React.useState("");

    const { username } = useParams();
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    const current_user: User = session.user;
    const [user, setUser] = React.useState({} as User);
    const [notFound, setNotFound] = React.useState(false);
    const [organizations, setOrganizations] = React.useState([] as Array<Organization>);
    const location = useLocation();

    React.useEffect((): void => {
        document.title = `User ${user.username} | Metropolis`;
    }, [user]);

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

    React.useEffect(() => {
        if (!("username" in user)) return;
        const organization_display_list: Array<String> = [];
        session.allOrgs.forEach((organization: Organization) => {
            if (user.organizations_leading.find((element) => element === organization.id)) {
                organization_display_list.push(organization.name);
            }
        });
        setOrganizationDisplay(organization_display_list.join(", "));
    }, [session.allOrgs, user]);

    return (
        notFound ? 
            <div className="header">
                <h6 className="username">Sorry, a user with this username was not found.</h6>
            </div>
            :
            "username" in user ?
                <>
                    <div className="header">
                        <img className="circle responsive-img profile-picture" src={user.gravatar_url} alt={`${user.username}'s profile picture`} />
                        <div className="name-info">
                            <h5 className="full-name">{user.first_name} {user.last_name}</h5>
                            <h6 className="username">{user.username}</h6>
                        </div>

                        {
                            session.user.id === user.id &&
                            <div className="edit-button">
                                <i className="zmdi zmdi-fw-3x zmdi-edit"></i>
                                <Link to="/accounts/profile/update">Edit</Link>
                            </div>
                        }
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
                                <Markdown text={user.bio} />
                                :
                                <p>This user has not shared any information.</p>
                            }
                        </div>
                    </div>
                </>
                :
                <div className="header">
                    <h6 className="username">Loading...</h6>
                </div>
    );
}