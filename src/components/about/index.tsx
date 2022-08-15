import * as React from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { routes } from "./routes";

export const About = (): JSX.Element => {

    const { page } = useParams();
    const nav: NavigateFunction = useNavigate();

    const header = (page: string | undefined): Array<JSX.Element> => {
        return routes.map((route: { id: string, text: string, path: string }) => {
            const headerClass = page === route.id ? "header active" : "header";
            return <li key={route.id} className={headerClass} onClick={() => nav(route.path)}>{route.text}</li>
        });
    }

    return (
        <div className="container">
            <div className="headers">
                <ul>
                    {/* <li className="header active" id="history">WLMCI</li>
                    <li className="header" id="about" onClick={() => nav("/about/about")}>ABOUT</li>
                    <li className="header" id="team" onClick={() => nav("/about/team")}>TEAM</li>
                    <li className="header" id="map" onClick={() => nav("/map")}>MAP</li>
                    <li className="header" id="school" onClick={() => nav("/about/school")}>CONTACT WLMCI</li>
                    <li className="header" id="contact" onClick={() => nav("/about/contact")}>CONTACT US</li> */}
                    {header(page)}
                </ul>
                {/* <script>
                    $(document).ready(function() {
                        var urlParams = new URLSearchParams(window.location.search);
                        if(!urlParams.get("tab")) {
                            $("#history").addClass("active");
                            urlParams.set("tab", "history");
                        }
                        history.replaceState(null, null, "?"+urlParams.toString());
                        $(".header").click(function() {
                            if (this.id == "map") {
                                window.open("/map", "_self")
                            } else {
                                $(".header").removeClass("active");
                                $(this).addClass("active");
                                $(".content").hide();
                                $("#content-"+this.id).show();
                                urlParams.set("tab", this.id);
                                history.replaceState(null, null, "?"+urlParams.toString());
                            }
                        });
                    });
                </script> */}
            </div>

            <AboutContent page={page} />
        </div>
    )
}

const AboutContent = (props: { page: string | undefined }): JSX.Element => {
    for (let comp in routes) {
        if (routes[comp].id === props.page) {
            return React.createElement(routes[comp].component);
        }
    }
    return React.createElement(routes[0].component); // Return history component by default
}
