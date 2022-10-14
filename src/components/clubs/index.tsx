import * as React from "react";
import { Link } from "react-router-dom";
import Organization from "../../util/core/interfaces/organization";
import User from "../../util/core/interfaces/user";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";
import { getTags } from "../../util/core/tags";

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
    const myUser: User = { id: 1, slug: "baf", name: ["baf1", "baf2"], bio: "baf", timezone: "baf", graduatingYear: 2023, organizations: [], following: [] };
    const myMedia: Media = new Media("http://localhost:8080/img/baf", 0);
    const myClub: Organization = {
        name: "Mackenzie Science Club",
        id: 0,
        bio: "We are the science club!",
        footer: "I am a footer",
        slug: "msc",
        hideMembers: false,
        membership: MembershipStatus.Accepting,
        owner: myUser,
        supervisors: [myUser, myUser],
        execs: [myUser, myUser],
        banner: myMedia,
        icon: myMedia,
        tags: [],
        urls: [],
    };

    return (
        <Club club={myClub} />
    );
}

const Club = (props: { club: Organization }): JSX.Element => {
    const club = props.club;
    return (
        <div className="card green-status">
            <div className="valign-wrapper">
                <div className="club-logo">
                    <img className="circle" src={club.banner.src.href} />
                </div>
                <h1 className="title link">
                    <Link to={`/club/${club.slug}`}>Mackenzie Science Club</Link>
                </h1>
            </div>

            <hr />
            <div className="club-description">
                <p>{club.bio}</p>
            </div>
            <div className="tag-section">
                {getTags(club.tags)}
            </div>
        </div>
    );
}