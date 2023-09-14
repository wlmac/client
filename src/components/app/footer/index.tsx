import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

export const Footer = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    return (
        <div className="footer">
            <div className="footer-title-par">
                <p className="footer-title">William Lyon Mackenzie's online hub for announcements, calendar events, clubs, and timetables.</p>
                <p className="footer-title"><Link to="/terms"><u>Terms of Service</u></Link> and <Link to="/privacy"><u>Privacy Policy</u></Link></p>
            </div>
            <div className="foooter-icon-par">
                <a className="footer-name" href="https://github.com/wlmac/metropolis" rel="noreferrer" target="_blank">
                    <i className="footer-icon zmdi zmdi-hc-2x zmdi-github"></i>
                </a>
            </div>
        </div>
    );
}