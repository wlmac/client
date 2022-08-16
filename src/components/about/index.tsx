import * as React from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { AboutRoutes } from "./routes";
import { useQuery } from "../../util/query";
import { AboutRoute } from "../../util/models";

export const About = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const page: string | null = query.get("tab");
    const nav: NavigateFunction = useNavigate();

    const header = (page: string | null): Array<JSX.Element> => {
        return AboutRoutes.map((route: AboutRoute): JSX.Element => {
            const headerClass: string = page === route.id ? "header active" : "header";
            return <li key={route.id} className={headerClass} onClick={(): void => nav(route.path)}>{route.text}</li>
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
    for (let comp of AboutRoutes) {
        if (comp.id === props.page) {
            return React.createElement(comp.component);
        }
    }
    return React.createElement(AboutRoutes[0].component); // Return history component by default
}
