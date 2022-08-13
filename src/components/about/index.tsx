import * as React from "react";
import { useParams, useNavigate, NavigateFunction } from "react-router-dom";
import { History } from "./history";

export const About = () => {

    const { page } = useParams();

    const aboutComponent = (): JSX.Element => {
        switch (page) {
            case "history":
                return (<History />);
            default:
                return (<History />);
        }
    }

    return (
        <div className="container">
            <div className="headers">
                <ul>
                    <li className="header active" id="history">WLMCI</li>
                    <li className="header" id="about">ABOUT</li>
                    <li className="header" id="team">TEAM</li>
                    <li className="header" id="map">MAP</li>
                    <li className="header" id="school">CONTACT WLMCI</li>
                    <li className="header" id="contact">CONTACT US</li>
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

            {aboutComponent()}
        </div>
    )
}
