import * as React from "react";

export const NotFound = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "404 Page Not Found";
    }, []);

    return (
        <p>Page not found or not implemented yet.</p>
    );
}