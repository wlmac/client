import * as React from "react";

import "./index.scss";

export const Announcements = () => {
    React.useEffect(() => {
        document.title = "Announcements | Metropolis";
    }, []);

    return (
        <p>Announcements page in progress</p>
    );
}