import * as React from "react";
import { Link } from "react-router-dom";
import { Session, SessionContext, User } from "../../../../util/core/session";
import config from "../../../../../config";

export const TeamMember = (props: { memberID: number, allUsers: Array<User> }): JSX.Element => {
    let user: User = props.allUsers.find((u: User) => u.id === props.memberID)!;
    console.log("All users:", props.allUsers);
    console.log(config.METROPOLIS_STAFF_BIO)
    return user ? (
        <Link to={`/user/${user.username}`}>
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
                    {
                        // @ts-expect-error
                        config.METROPOLIS_STAFF_BIO[props.memberID]}
                </div>
            </div>
        </Link>
    ) : <></>;
}