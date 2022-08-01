import * as React from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";


export const NavigationLink = (props: any) => {
    const nav = useNavigate();

    return (
        <a className="nav-link" href={props.href} onClick={(ev)=>{
            ev.preventDefault();
            nav(props.href);
        }}>{props.children}</a>
    );
}

export const NavigationBar = () => {
    const nav = useNavigate();

    return (
        <nav>
            <div className="nav-wrapper">
                <NavigationLink href="/">
                    <div className="brand-logo">
                        <img className="img-logo" src="/static/img/themes/logos/dark-transparent.png" />
                    </div>
                </NavigationLink>
                    
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="zmdi zmdi-menu"></i></a>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <a className="dropdown-trigger" data-target="dropdownAnnouncements">Announcements<i className="zmdi zmdi-caret-down"></i></a>
                        <ul id="dropdownAnnouncements" className="dropdown-content">
                            <li>
                                <NavigationLink href="/announcements?feed=all">All</NavigationLink>
                            </li>
                        
                            <li>
                                <NavigationLink href="/announcements?feed=school">School</NavigationLink>
                            </li>
                        
                            <li>
                                <NavigationLink href="/announcements?feed=studentcouncil">Student Council</NavigationLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavigationLink href="/calendar">Calendar</NavigationLink>
                    </li>
                    <li className="nav-item">
                        <NavigationLink href="/clubs">Clubs</NavigationLink>
                    </li>
                    <li className="nav-item">
                        <NavigationLink href="/blog">Content</NavigationLink>
                    </li>
                    <li className="nav-item">
                        <NavigationLink href="/resources">Resources</NavigationLink>
                    </li>
                    <li>
                        <a className="dropdown-trigger" href="/#!" data-target="dropdownAbout">About<i className="zmdi zmdi-caret-down"></i></a><ul id="dropdownAbout" className="dropdown-content">
                            <li>
                                <NavigationLink href="/about?tab=history">WLMCI</NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/about?tab=about">About</NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/about?tab=team">Team</NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/map">Map</NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/about?tab=school">Contact WLMCI</NavigationLink>
                            </li>
                            <li>
                                <NavigationLink href="/about?tab=contact">Contact Us</NavigationLink>
                            </li>
                        </ul>
                        
                    </li>
                    
                    
                    <li><a className="dropdown-trigger" href="/#!" data-target="dropdownAcc">
                        
                        Login/Sign Up
                        
                        <i className="zmdi zmdi-caret-down"></i>
                    </a><ul id="dropdownAcc" className="dropdown-content" >
            
            <li><a href="/accounts/login/?next=/">Login</a></li>
            <li><a href="/accounts/signup/?next=/">Sign Up</a></li>
            
        </ul></li>
                </ul>
            </div>
        </nav>
    );
}