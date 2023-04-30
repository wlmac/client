import * as React from "react";
import { Link } from "react-router-dom";
import { Session, SessionContext, User } from "../../../../util/core/session";
import config from "../../../../../config";

export const TeamMember = (props: { memberID: number }): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    console.log("allusers:", session.allUsers);
    console.log("allusers:", session.allOrgs);
    let user: User = session.allUsers.find((u: User) => u.id === props.memberID)!;

    return user ? (
        <Link to="/user/justinlu">
            <div className="member">
                <div className="member-name">
                    <div className="member-image">
                        <img className="circle" src={user.gravatar_url} />
                    </div>
                    <div className="member-text">
                        {`${user.first_name} ${user.last_name}`}
                    </div>
                </div>

                <hr />
                <div className="member-bio">
                    {/* STILL IN PROGRESS */ config.METROPOLIS_STAFF_BIO[props.memberID]}
                </div>
            </div>
        </Link>
    ) : <></>;
}