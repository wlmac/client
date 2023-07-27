import * as React from "react";
import { loggedIn } from "../core/AuthService"
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Session, SessionContext } from "../core/session";

export const LoginRequired = (props: { children: JSX.Element }): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    if (!loggedIn()) {
        session.notify("Please login to access this page", "info");
        nav(`/accounts/login?next=${encodeURIComponent(window.location.pathname)}`, { replace: true });
    }

    return loggedIn() ? props.children : <></>;
}