import * as React from "react";
import { default as axios } from 'axios';

import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Organization from "../../util/core/interfaces/organization";
import User from "../../util/core/interfaces/user";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";
import { getTags, TagElement } from "../../util/core/tags";
import { Session, SessionContext } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";
import Tag from "../../util/core/interfaces/tag";

export const Clubs = (): JSX.Element => {
    React.useEffect((): void => {
        document.title = "Clubs | Metropolis";
    }, []);

    const nav: NavigateFunction = useNavigate();

    React.useEffect((): void => {
        if (!localStorage.getItem("token")) {
            nav("/accounts/login");
        }
    });

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
                        {ClubList()}
                    </div>
                </div>
            </div>
        </>
    );
}

const ClubList = (): JSX.Element[] => {
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
        banner: "",
        icon: myMedia,
        tags: [],
        urls: [],
    };

    const session: Session = React.useContext(SessionContext);
    const [clubs, setClubs] = React.useState([]);
    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/organization`;
        // console.log(`Token: ${session.token}`);
        // console.log(`Fetching URL: ${fetchURL}`);
        session.getAPI(fetchURL).then((res) => {
            console.log("Success:");
            console.log(res.data.results);
            setClubs(res.data.results);
        }).catch((err) => {
            console.log("Error occured while fetching organizations:");
            console.log(err);
            session.refreshAuth();
        });

        // Tags
        session.getAPI(`${Routes.OBJECT}/tag`).then((res) => {
            const tags = res.data.results;
            setTags(tags);
        }).catch(() => {
            session.refreshAuth();
        });
    }, []);

    return clubs.map((club: Organization): JSX.Element => {
        let current_tags: Tag[] = [];
        for (let i = 0; i < club.tags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                if (club.tags[i] == (tags[j] as Tag).id) {
                    current_tags.push(tags[j]);
                }
            }
        }
        return <Club club={club} tags={current_tags} key={club.id} />;
    });
}

const Club = (props: { club: Organization, tags: Tag[] }): JSX.Element => {
    const club = props.club;
    const [tags, setTags] = React.useState([]);
    const session = React.useContext(SessionContext);

    React.useEffect(() => {
        session.getAPI(`${Routes.OBJECT}/tag`).then((res) => {
            const tags = res.data.results;
            setTags(tags.map((tag: Tag): JSX.Element => {
                return <TagElement tag={tag} />;
            }));
        }).catch(() => {
            session.refreshAuth();
        });
    }, []);

    return (
        <div className="card green-status">
            <div className="valign-wrapper">
                <div className="club-logo">
                    <img className="circle" src={club.banner} />
                </div>
                <h1 className="title link">
                    <Link to={`/club/${club.slug}`}>{club.name}</Link>
                </h1>
            </div>

            <hr />
            <div className="club-description">
                <p>{club.bio}</p>
            </div>
            <div className="tag-section">
                {
                    props.tags.map((tag: Tag) => {
                        return <TagElement key={tag.id} tag={tag} />
                    })
                }
            </div>
        </div>
    );
}