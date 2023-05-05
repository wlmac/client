import * as React from "react";
import { Session, SessionContext } from "../../../../util/core/session";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Login Required
export const MyProfile = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    React.useEffect(() => {
        if (session.user.username) {
            nav(`/user/${session.user.username}`);
        }
    }, [session.user.id]);

    return <></>;
}