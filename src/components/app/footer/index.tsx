import * as React from "react";
import { useNavigate } from "react-router-dom";

export const Footer = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    return (
        <div className="footer">
            <div className="footer-title-par">
                <p className="footer-title">William Lyon Mackenzie's online hub for announcements, calendar events, clubs, and timetables.</p>
                <p className="footer-title"><a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></p>
            </div>
            <hr className="footer-bar"></hr>
            <div className="foooter-icon-par">
                <a className="footer-name" href="https://github.com/wlmac/metropolis" rel="noreferrer" target="_blank">
                    <i className="footer-icon zmdi zmdi-hc-3x zmdi-github"></i>
                </a>
            </div>
        </div>
    );
}
