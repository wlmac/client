import * as React from "react";
import { Link } from "react-router-dom";

export const Clubs = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "Clubs | Metropolis";
    }, []);

    const goBack = (): void => {
        window.history.back();
    }

    return (
        <>
            <link rel="stylesheet" href="/static/css/club-list.css" />

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
                        <ClubList />
                    </div>
                </div>
            </div>
        </>
    );
}

const ClubList = (): JSX.Element => {
    return (
        <div className="card green-status">
            <div className="valign-wrapper">
                <div className="club-logo">

                    <img className="circle" src="./Clubs _ Metropolis_files/a61c314186284959bed2254d5b0d37eb.png" />

                </div>
                <h1 className="title link">
                    <Link to="/club/msc">Mackenzie Science Club</Link>
                </h1>
            </div>

            <hr />
            <div className="club-description">
                <p>The Mackenzie Science Club (MSC) hosts weekly STEM events and boasts over 200 members. Alongside being Mackenzie's largest club, MSC is responsible for many of students' favourite STEM and seasonal events throughout the year!

                    Whether you want to showcase your scientific knowledge, race to build the tallest tower, or flaunt your trivia knowledge, no matter the skill level, MSC has got an event for everyone! During the year, members will test their science and problem-solving skills while competing with/against their friends. Top participants are also given the chance to attend the end-of-year Science Olympics hosted by Ontario universities!

                    Keep up to date with MSC through their Discord and google classroom below:
                    Discord: https://discord.gg/5SgHZ3N
                    Google Classroom Code: Insite6</p>
            </div>
            <div className="tag-section">

                <p className="tag" style={{ backgroundColor: "#d7ccff" }}>science</p>

                <p className="tag" style={{ backgroundColor: "#ffd3cc" }}>open membership</p>

            </div>
        </div>
    );
}
