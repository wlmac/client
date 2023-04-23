import * as React from "react";
import { Session, SessionContext, User } from "../../../../util/core/session";
import { Link } from "react-router-dom";
import Organization from "../../../../util/core/interfaces/organization";

export const ProfileView = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    let user: User = session.user;

    const [organizationDisplay, setOrganizationDisplay] = React.useState("");

    React.useEffect(() => {
        const organization_display_list: Array<String> = [];
        session.allOrgs.forEach((organization: Organization) => {
            if (user.organizations.find((element) => element === organization.id)) {
                organization_display_list.push(organization.name);
            }
        });
        setOrganizationDisplay(organization_display_list.join(", "));
    }, [session.allOrgs]);

    return (
        <>
            <div className="header">
                <img className="circle responsive-img profile-picture" src={user.gravatar_url} alt={`${user.username}'s profile picture`} />
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
        </>
    );
}