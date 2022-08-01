import * as React from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

export const Home = () => {
    const nav = useNavigate();

    return (
        <div id="content-container">
            <div className="banner">
                <div className="background"><img src="./Home _ Metropolis_files/summer.jpg" /></div>
                <div className="overlay-container valign-wrapper">
                    <div className="next-class center-align">
                        <h4 className="schedule-course">No School</h4>
                        <span className="schedule-description">Enjoy your day!</span>
                    </div>
                </div>
                <div className="schedule-today-overlay hide-on-small-and-down">
                    <div className="schedule-today-overlay-container">
                        <h4 className="schedule-cycle"></h4>
                        <div className="schedule-today-courses"></div>
                    </div>
                </div>
                
                    <div className="overlay-container">
                        <div className="banner-message center-align">
                    <span>
                        
                        <a href="https://maclyonsden.com/accounts/signup/">Sign up</a> and add your timetable to see a personalized schedule here.
                        
                    </span>
                        </div>
                    </div>
                
            </div>
            <div id="main-container">
                    
                    <div className="blog row">
                        <div className="blog-content s5 col valign-wrapper left-align s5">
                            <div className="blog-content-container">
                                <h4 className="title">Sacred Silence - 6 weeks at a glance</h4>
                                <hr />
                                <div className="blog-body markdown-container">
                                    <p>Hey Mac! Now that we're at the end of the school year, have you taken the time to finally catch your breath and meditate? Some of us had started this challenge in the middle of culminatings and completed it, hopefully now you can too :)</p>
                                    <a className="full-content-page link" href="https://maclyonsden.com/blog/sacred-silence-infographic">Read full blog
                                        post <i className="zmdi zmdi-chevron-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <img className="blog-image hide-on-small-and-down col s7" src="./Home _ Metropolis_files/ac3ad78602d841cfa346c3d6fc70c659.png" />
                    </div>
                
                <div id="recent-events" className="card-list center-align">
                    <div className="cards-container">
                        
                            There are no events at this time.
                        
                    </div>
                    <a className="full-content-page link" href="https://maclyonsden.com/calendar">View all events <i className="zmdi zmdi-chevron-right"></i></a>
                </div>
                <hr style={{margin: "10px calc(2% + 10px)", borderTopWidth: "2.5px", borderColor: "#d9d9d9"}} />
                <div id="recent-announcements" className="center-align">
                    <div id="announcements" className="cards-container">
                        <div className="announcement-card card  left-align" style={{borderColor: "#ffccce"}}>
                            <h5 className="title truncate">Project Metropolis - NOW HIRING!</h5>
                            <div className="authors">
                                <div className="authors-image">
                                    <a href="https://maclyonsden.com/club/metropolis"><img className="circle" src="./Home _ Metropolis_files/1ba64f684a334d26bd87add205e97154.png" /></a>
                                </div>
                                <div className="authors-text">
                                    <a href="https://maclyonsden.com/club/metropolis">Project Metropolis</a>
                                </div>
                            </div>
                            <hr />
                            <div className="announcement-description markdown-container">
                                <p>Aloha Mac Lyons!<br />Project Metropolis doesn't run itself - behind Mac Lyons' Den young humans are hard at work. In hardly a year, our tightly-knit team developed the Project Metropolis label and everything with it - app, website, podcasts, playlists, and doodle games.<br />Today we are imploring you to apply so you can join in the action!<br />Choose this fulfilling highlight to your high school years, collect transferable skills for any field and application, and create memories to last a lifetime.<br />Bring your vision inspired by passion and fueled by courage. Frontend, Backend, App, Content, and/or Art has a place for your authentic self. Apply today: https://forms.gle/MLrFckYTyYJ3R5KdA</p>
                                <a className="link" href="https://maclyonsden.com/announcement/216">See announcement <i className="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    
                        <div className="announcement-card card  left-align" style={{borderColor: "#e4ffcc"}}>
                            <h5 className="title truncate">Issue 4 is here!</h5>
                            <div className="authors">
                                <div className="authors-image">
                                    <a href="https://maclyonsden.com/club/the-lyon"><img className="circle" src="./Home _ Metropolis_files/83522403688c489096bb13b7e56ed6b1.png" /></a>
                                </div>
                                <div className="authors-text">
                                    <a href="https://maclyonsden.com/club/the-lyon">The Lyon</a>
                                </div>
                            </div>
                            <hr />
                            <div className="announcement-description markdown-container">
                                <p>Issue 4 of the Lyon is here! Click the link below to read.<br />https://drive.google.com/file/d/1YyxqnbjOSZ29YBQVKDKRF5OZwFnBdmzX/view?usp=sharing</p>
                                <a className="link" href="https://maclyonsden.com/announcement/215">See announcement <i className="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    
                        <div className="announcement-card card  hide-on-med-and-down  left-align" style={{borderColor: "#ffccce"}}>
                            <h5 className="title truncate">MAC DANCE HALL</h5>
                            <div className="authors">
                                <div className="authors-image">
                                    <a href="https://maclyonsden.com/club/visual-arts-council"><img className="circle" src="./Home _ Metropolis_files/db0f93bdc7eb40e188a938fa8b1f0591.JPEG" /></a>
                                </div>
                                <div className="authors-text">
                                    <a href="https://maclyonsden.com/club/visual-arts-council">Visual Arts Council</a>
                                </div>
                            </div>
                            <hr />
                            <div className="announcement-description markdown-container">
                                <p>MAC DANCE HALL <br />A 2022 Mackenzie Senior Film Class Production<br />Filmed &amp; Edited at William Lyon Mackenzie CI, Toronto, ON<br />CREATED BY: Senior Film Class 2022<br />PERFORMED BY: Senior Dance Class 2022<br />DANCERS: Alexandria Brown, Zian Chambers, Emmaline Dindial, Linnea Fradley, Julianne Ho, Brianna, Hoang Truong, Celine Hwang, Anjali Joshi, Maya Manchieva, Hannah Melnick, Charlize Novak, Eliana Scanga, Morrie Yalowsky<br />DIRECTOR: Gene Song<br />PRODUCERS: Connie Zomparelli, Mervegul Adsiz, Vanessa Aniuzu<br />CINEMATOGRAPHER: Akisha Torio<br />CAMERA: Akisha Torio, Livia, Kurti, Charlie Shereck, Conrad Sandler<br />EDITORS: Conrad Sandler, Michael Samosin, Akisha Torio, Gene Song<br />CHOREOGRAPHY: Brandon “Bizzy” Owusu<br />STAGING: Alexandra Parravano<br />MUSIC: “Ice Rain” - Mr. Vegas &amp; Massive B / “Head in the Zone” - Sean Paul / “She Wants it Bad” - Lefside &amp; ESCO<br />SPECIAL THANKS TO OUR TEACHERS: Ian Lawrence, Alexandra Parravano, Brandon “Bizzy” Owusu <br />**Link to Music Video: https://www.youtube.com/watch?v=zVXMDwIhiCQ**</p>
                                <a className="link" href="https://maclyonsden.com/announcement/214">See announcement <i className="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <a className="full-content-page link" href="https://maclyonsden.com/announcements" onClick={(ev) => {
                        ev.preventDefault();
                        nav("/announcements");
                    }}>View all announcements <i className="zmdi zmdi-chevron-right"></i></a>
                </div>
            </div>
        </div>
    );
}