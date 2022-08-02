import * as React from "react";

export const NotFound = () => {
    React.useEffect(() => {
        document.title = "404 Page Not Found";
    }, []);

    return (
        <p>Page not found or not implemented yet.</p>
    );
}