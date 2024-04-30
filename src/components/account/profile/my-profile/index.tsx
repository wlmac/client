import * as React from "react";
import { Session, SessionContext } from "../../../../util/core/session";
import { NavigateFunction, useNavigate } from "react-router-dom";

// Login Required
export const MyProfile = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    console.log(session)
    const nav: NavigateFunction = useNavigate();

    React.useEffect(() => {
        console.log("Helloa");
        console.log(session.user);
        if (session.user.username) {
            nav(`/user/${session.user.username}`);
        }
    }, [session.user]);

    return <></>;
}