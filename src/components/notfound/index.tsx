import * as React from "react";

import "./index.scss";

export const NotFound = () => {
    React.useEffect(() => {
        document.title = "404 Page Not Found";
    }, []);

    return (
        <p>Page not found</p>
    );
}