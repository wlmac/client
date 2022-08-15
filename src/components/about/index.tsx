import * as React from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { routes } from "./routes";
import { useQuery } from "../../util/query";

export const About = (): JSX.Element => {
    const query = useQuery();
    const page = query.get("tab");
    const nav: NavigateFunction = useNavigate();

    const header = (page: string | null): Array<JSX.Element> => {
        return routes.map((route: { id: string, text: string, path: string }) => {
            const headerClass = page === route.id ? "header active" : "header";
            return <li key={route.id} className={headerClass} onClick={() => nav(route.path)}>{route.text}</li>
        });
    }

    return (
        <div className="container">
            <div className="headers">
                <ul>
                    {header(page)}
                </ul>
            </div>

            <AboutContent page={page} />
        </div>
    )
}

const AboutContent = (props: { page: string | null }): JSX.Element => {
    for (let comp in routes) {
        if (routes[comp].id === props.page) {
            return React.createElement(routes[comp].component);
        }
    }
    return React.createElement(routes[0].component); // Return history component by default
}
