import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { SessionContext } from "../../../util/core/session";
import { useQuery } from '../../../util/query';

export const Logout = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    const session = React.useContext(SessionContext);

    const query: URLSearchParams = useQuery();
    const next: string | null = query.get("next");

    React.useEffect((): void => {
        document.title = "Logout | Metropolis";

        session.clearCache();
        session.logout();

        session.notify("Successfully logged out. See you later!", "success");

        if (next) {
            nav(next);
        }
        else {
            nav("/");
        }
    });

    return (
        <></>
    );
}