import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "../../util/query";
import { AnnouncementFeeds } from "./feeds";
import { AnnouncementFeed } from "../../util/models";
import Announcement from "../../util/core/interfaces/announcement";
import Organization from "../../util/core/interfaces/organization";
import MembershipStatus from "../../util/core/misc/membership";
import Media from "../../util/core/misc/media";
import Tag from "../../util/core/interfaces/tag";
import { getTags, TagElement } from "../../util/core/tags";
import { Session, SessionContext } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";
import { loggedIn } from "../../util/core/AuthService";

export const Announcements = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");

    const [openCreator, setOpenCreator] = React.useState(false);

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    React.useEffect((): void => {
        if (!loggedIn()) {
            nav(`/accounts/login?next=/announcements`);
        }
    });

    const header = (currentFeed: string | null): Array<JSX.Element> => {
        return AnnouncementFeeds.map((feed: AnnouncementFeed): JSX.Element => {
            const headerClass: string = feed.id === currentFeed ? "header active" : "header";
            return <li key={feed.id} className={headerClass} onClick={(): void => nav(`/announcements?feed=${feed.id}`)}>{feed.text}</li>
        });
    }

    const openModal = () => {
        setOpenCreator(true);
    };

    return (
        <>
            <link rel="stylesheet" href="static/css/announcement-list.css" />
            <AnnouncementCreator openCreator={openCreator} setOpenCreator={setOpenCreator} />
            <div className="container">

                <div className="headers">
                    <ul>
                        {header(feed)}
                        <button onClick={openModal}>open</button>
                    </ul>
                </div>
                <div className="card-container">
                    <div className="cards" id="cards-all">
                        {AnnouncementList()}
                    </div>
                </div>
            </div>
        </>
    );
}

const AnnouncementList = (): JSX.Element[] => {
    const session: Session = React.useContext(SessionContext);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/announcement`;
        session.getAPI(fetchURL).then((res) => {
            setAnnouncements(res.data.results);
        }).catch((err) => {
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

    const [announcements, setAnnouncements] = React.useState([]);
    const [tags, setTags] = React.useState([]);

    return announcements.map((announcement: Announcement): JSX.Element => {
        let current_tags: Tag[] = [];
        for (let i = 0; i < announcement.tags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                if (announcement.tags[i] == (tags[j] as Tag).id) {
                    current_tags.push(tags[j]);
                }
            }
        }
        return <AnnouncementElement key={announcement.id} announcement={announcement} tags={current_tags} />;
    });
}

const AnnouncementElement = (props: { announcement: Announcement, tags: Tag[] }): JSX.Element => {
    const data: Announcement = props.announcement;

    return (
        <div className="card">
            <div className="card-headers">
                <div className="tag-section">
                    {
                        props.tags.map((tag: Tag): JSX.Element => {
                            return <TagElement key={tag.id} tag={tag} />
                        })
                    }
                </div>
                <h1 className="title">{data.title}</h1>
                <div className="card-authors">
                    <div className="card-authors-image">
                        <Link to={`/club/${data.organization}`}><img className="circle" src={data.organization} /></Link>
                    </div>
                    <div className="card-authors-text">
                        <Link to={`/club/${data.organization}`} className="link">{data.organization}</Link>,
                        <Link to={`/user/${data.author}`} className="link">{data.author}</Link>
                        <br />
                        • {data.created}
                    </div>
                </div>
            </div>
            <hr />
            <div className="card-body">
                {data.body}
            </div>
            <br />
            <Link className="link" to={`/announcement/${data.id}`}>See announcement <i className="zmdi zmdi-chevron-right"></i></Link>
        </div>
    );
}

const AnnouncementCreator = (props: { openCreator: boolean, setOpenCreator: React.Dispatch<any> }): JSX.Element => {
    const openCreator: boolean = props.openCreator, setOpenCreator: React.Dispatch<any> = props.setOpenCreator;
    if (!openCreator) return <></>

    return (
        <div className="popup">
            <div className="modal-a">
                <div className="modal-top">
                    <h5 className="header-announcement">Add Announcement</h5>
                    <button onClick={() => setOpenCreator(false)} className="cancel">cancel</button>
                </div>
                <div className="modal-content">
                    <div className="form">
                        <h6 className="form-label">Organization</h6>
                        <input type="text" className="textbox"></input>
                    </div>
                    <div className="form">
                        <h6 className="form-label">Title</h6>
                        <input type="text"></input>
                    </div>
                    <div className="form">
                        <h6 className="form-label">Body</h6>
                        <input type="text"></input>
                    </div>
                    <div className="form">
                        <h6 className="form-label">Tags</h6>
                        <input type="text"></input>
                    </div>
                    <div className="form">
                        <h6 className="form-label">Public</h6>
                        <input type="checkbox" className="toggle" />
                    </div>
                </div>
            </div>
        </div>
    );
}
