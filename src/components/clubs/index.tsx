import * as React from "react";

export const Clubs = (): JSX.Element => {
    const goBack = (): void => {
        window.history.back();
    }

    return (
        <>
            <link rel="stylesheet" href="static/css/club-list.css" />

            <a id="back" onClick={goBack}>
                <i className="zmdi zmdi-arrow-left"></i>
            </a>

            <div className="container">
                <div className="card-container">
                    <div className="legend">
                        <div className="legend-items">
                            <div className="green-square"></div>
                            <span>Open Membership</span>
                        </div>
                        <div className="legend-items">
                            <div className="yellow-square"> </div>
                            <span>Accepting Applications</span>
                        </div>
                        <div className="legend-items">
                            <div className="red-square"> </div>
                            <span>Closed Applications</span>
                        </div>
                    </div>
                    <div className="cards">

                        <div className="card green-status ">
                            <div className="valign-wrapper">
                                <div className="logo">

                                    <img className="circle" src="./Clubs _ Metropolis_files/4e3ac591787145e9863f1d76974b75e4.png" />

                                </div>
                                <h1 className="title link">
                                    <a href="https://maclyonsden.com/club/msc">Mackenzie Science Club</a>
                                </h1>
                            </div>

                            <hr />
                            <div className="description">
                                <p>The Mackenzie Science Club (MSC) hosts weekly STEM events and boasts over 200 members. Alongside being Mackenzie's largest club, MSC is responsible for many of students' favourite STEM and seasonal events throughout the year!

                                    Whether you want to showcase your scientific knowledge, race to build the tallest tower, or flaunt your trivia knowledge, no matter the skill level, MSC has got an event for everyone! During the year, members will test their science and problem-solving skills while competing with/against their friends. Top participants are also given the chance to attend the end-of-year Science Olympics hosted by Ontario universities!

                                    Keep up to date with MSC through their Discord below:
                                    https://discord.gg/5SgHZ3N</p>
                            </div>
                            <div className="tag-section">

                                <p className="tag" style={{ backgroundColor: "#d7ccff" }}>science</p>

                                <p className="tag" style={{ backgroundColor: "#ffd3cc" }}>open membership</p>

                            </div>
                        </div>

                        <div className="card green-status ">
                            <div className="valign-wrapper">
                                <div className="logo">

                                    <img className="circle" src="./Clubs _ Metropolis_files/3800af883686418cacd1eeb2dd093fcb.png" />

                                </div>
                                <h1 className="title link">
                                    <a href="https://maclyonsden.com/club/mcpt">Mackenzie Computer Programming Team (MCPT)</a>
                                </h1>
                            </div>

                            <hr />
                            <div className="description">
                                <p>MCPT is Mackenzie's go-to club for programming!

                                    We run events such as game development workshops, team contests, and ICS mentorship regularly throughout the school year. If you're looking for a fun creative outlet, a new challenge, or a way to be competitive with friends, MCPT has something for you!</p>
                            </div>
                            <div className="tag-section">

                                <p className="tag" style={{ backgroundColor: "#efffcc" }}>technology</p>

                            </div>
                        </div>

                        <div className="card green-status ">
                            <div className="valign-wrapper">
                                <div className="logo">

                                    <img className="circle" src="./Clubs _ Metropolis_files/8a26d92eff5d441d80480e08360d7607.png" />

                                </div>
                                <h1 className="title link">
                                    <a href="https://maclyonsden.com/club/math-club">Math Club</a>
                                </h1>
                            </div>

                            <hr />
                            <div className="description">
                                <p>Hey guys come join us at math club for fun and contest prep. Meetings are Monday at 4:30 come join using the link provided. Euclid sign ups open. FGH sign up open.</p>
                            </div>
                            <div className="tag-section">

                                <p className="tag" style={{ backgroundColor: "#d5ccff" }}>math</p>

                            </div>
                        </div>

                        <div className="card green-status ">
                            <div className="valign-wrapper">
                                <div className="logo">

                                    <img className="circle" src="./Clubs _ Metropolis_files/67bc96e20f79440a82769c3afb4b2413.jpg" />

                                </div>
                                <h1 className="title link">
                                    <a href="https://maclyonsden.com/club/animanga-club">Animanga Club</a>
                                </h1>
                            </div>

                            <hr />
                            <div className="description">
                                <p>The Animanga Club gathers those who share the same interests in Japanese media, specifically anime, manga and light novels. We want to create a community that explores these common interests together.

                                    Our club will be streaming anime in-person in the library during lunch on Fridays.

                                    Classroom Code: 6lrggju
                                    Discord: https://discord.gg/kF4jaJpMfy</p>
                            </div>
                            <div className="tag-section">

                                <p className="tag" style={{ backgroundColor: "#f9ccff" }}>cultural &amp; community</p>

                                <p className="tag" style={{ backgroundColor: "#ffd3cc" }}>open membership</p>

                            </div>
                        </div>

                        <div className="card green-status ">
                            <div className="valign-wrapper">
                                <div className="logo">

                                    <img className="circle" src="./Clubs _ Metropolis_files/bc86369025ae4d51bf0a53f254cf06c1.png" />

                                </div>
                                <h1 className="title link">
                                    <a href="https://maclyonsden.com/club/MEC">Mackenzie Engineering Club</a>
                                </h1>
                            </div>

                            <hr />
                            <div className="description">
                                <p>Mackenzie Engineering Club will be hosting fun and educational events for members throughout the 2021-2022 school year. Held bi-weekly, each event will give members a chance to explore all the various engineering fields, whether it may be aerospace, mechanical, or biomedical. We hope to share our passion for engineering with everyone and help guide the engineers of tomorrow.

                                    Join our Google Classroom: nq2r5zu
                                    Linktree: https://linktr.ee/wlmac.mec</p>
                            </div>
                            <div className="tag-section">

                                <p className="tag" style={{ backgroundColor: "#f0ccff" }}>club events</p>

                                <p className="tag" style={{ backgroundColor: "#ffd3cc" }}>open membership</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}