import * as React from "react";
import { Link } from "react-router-dom";

export const ContentContact = (): JSX.Element => {
    return (
        <div className="content" id="content-contact">
            <h1 className="title">Contact Us</h1>
            <hr />
            <p className="text">
                If you ever find bugs or problems with the site, or need to be granted the staff status,
                feel free to <Link className="link" to="mailto:hello@maclyonsden.com" target="_blank">email</Link> us
                or use the form below.
            </p>
            <ul className="link-section">
                <div>
                    <li>
                        <Link className="link" to="mailto:hello@maclyonsden.com" target="_blank">
                            <i className="zmdi zmdi-email zmdi-hc-lg" aria-hidden="true"></i>
                            <p>hello@maclyonsden.com</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="https://github.com/wlmac" target="_blank">
                            <i className="zmdi zmdi-github zmdi-hc-lg" aria-hidden="true"></i>
                            <p>wlmac</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="https://www.instagram.com/wlmac.sac/" target="_blank">
                            <i className="zmdi zmdi-instagram zmdi-hc-lg" aria-hidden="true"></i>
                            <p>@wlmac.sac</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="link" to="https://www.facebook.com/groups/keeptrackofmac" target="_blank">
                            <i className="zmdi zmdi-facebook-box zmdi-hc-lg" aria-hidden="true"></i>
                            <p>Keep Track of MAC</p>
                        </Link>
                    </li>
                </div>
            </ul>
            <br />
            <div className="content-embed">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSerD9wL2Sg8AIEVxc7ZPPIYcNPnCBnUuXTxOajhkvv8TMxwAw/viewform?embedded=true" style={{ borderWidth: 0, margin: 0 }}>
                    Loading...
                </iframe>
            </div>
        </div>
    )
}