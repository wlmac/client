import * as React from "react";
import { Link } from "react-router-dom";

export const ContentSchool = (): JSX.Element => {
    return (
        <div className="content" id="content-school">
            <h1 className="title">Contact the School</h1>
            <hr />
            <p className="text">
                Project Metropolis is a site affiliated with William Lyon Mackenzie Collegiate Institute.
                To contact the school, please refer to the channels of communication listed below.
            </p>
            <ul className="link-section">
                <div>
                    <li>
                        <Link className="link" to="https://wlmac.ca/" target="_blank">
                            <i className="zmdi zmdi-link zmdi-hc-lg" aria-hidden="true"></i>
                            <p>WLMCI Offical Website</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="https://goo.gl/maps/WyfTKUqKrbecU4RE9" target="_blank">
                            <i className="zmdi zmdi-map zmdi-hc-lg" aria-hidden="true"></i>
                            <p>20 Tillplain Road, North York, ON M3H 5R2</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="tel:4163953330">
                            <i className="zmdi zmdi-phone zmdi-hc-lg" aria-hidden="true"></i>
                            <p>(416) 395-3330</p>
                        </Link>
                    </li>
                </div>
            </ul>
            <h2 className="subtitle">Admin</h2>
            <hr />
            <ul className="link-section">
                <div>
                    <h3 className="section-title">Principal</h3>
                    <li>
                        <Link className="link" to="mailto:keith.johnson@tdsb.on.ca" target="_blank">
                            <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                            <p>Keith Johnson (keith.johnson@tdsb.on.ca)</p>
                        </Link>
                    </li>
                    <h3 className="section-title">Vice Principals</h3>
                    <li>
                        <Link className="link" to="mailto:joanne.d&#39;addio@tdsb.on.ca" target="_blank">
                            <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                            <p>Joanne D'Addio (joanne.d'addio@tdsb.on.ca)</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="mailto:stephen.morris@tdsb.on.ca" target="_blank">
                            <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                            <p>Stephen Morris (stephen.morris@tdsb.on.ca)</p>
                        </Link>
                    </li>
                </div>
            </ul>

        </div>
    )
}