import * as React from "react";
import { Link } from "react-router-dom";
import { Session, SessionContext, User } from "../../../../util/core/session";
import config from "../../../../../config";
import Routes from "../../../../util/core/misc/routes";

export const TeamMember = (props: { memberID: number }): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const [user, setUser] = React.useState<User>({} as User);

    React.useEffect(() => {
        session.request('get', `${Routes.USER}/retrieve/${props.memberID}`).then((res) => {
            setUser(res.data);
        });
    }, []);

    return "username" in user ? (
        <div className="member">
            <Link to={`/user/${user.username}`}>
                <div className="member-name">
                    <div className="member-image">
                        <img className="circle" src={user.gravatar_url} />
                    </div>
                    <div className="member-text">
                        {`${user.first_name} ${user.last_name}`}
                    </div>
                </div>
            </Link>

            <hr />
            <div className="member-bio">
                {
                    // @ts-expect-error
                    config.METROPOLIS_STAFF_BIO[props.memberID]}
            </div>
        </div>
    ) : <></>;
}