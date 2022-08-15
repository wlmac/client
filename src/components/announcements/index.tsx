import * as React from "react";

import "./index.scss";

export const Announcements = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    return (
        <p>Announcements page in progress</p>
    );
}