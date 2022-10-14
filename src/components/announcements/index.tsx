import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "../../util/query";
import { AnnouncementFeeds } from "./feeds";
import { AnnouncementFeed } from "../../util/models";
import Announcement from "../../util/core/interfaces/announcement";
import User from "../../util/core/interfaces/user";
import Organization from "../../util/core/interfaces/organization";
import MembershipStatus from "../../util/core/misc/membership";
import Media from "../../util/core/misc/media";
import Tag from "../../util/core/interfaces/tag";
import { getTags } from "../../util/core/tags";

export const Announcements = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");

    const [openCreator, setOpenCreator] = React.useState(false);

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

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
                        <AnnouncementList />
                    </div>
                </div >
            </div >
        </>
    );
}

const AnnouncementList = (): JSX.Element => {
    const myUser: User = { id: 1, slug: "baf", name: ["baf1", "baf2"], bio: "baf", timezone: "baf", graduatingYear: 2023, organizations: [], following: [] };
    const myMedia: Media = new Media("http://localhost:8080/img/baf", 0);
    const myOrg: Organization = { name: "baf", id: 1, bio: "baf", footer: "baf", slug: "baf", hideMembers: false, membership: MembershipStatus.Open, owner: myUser, supervisors: [], execs: [], banner: myMedia, icon: myMedia, tags: [], urls: [] };
    const announcement: Announcement = {
        id: 1,
        author: myUser,
        organization: myOrg,
        created: new Date(),
        modified: new Date(),
        title: "baf",
        body: "baf",
        supervisor: myUser,
        tags: [],
    }
    return (
        <AnnouncementElement announcement={announcement} />
    )
}

const AnnouncementElement = (props: { announcement: Announcement }): JSX.Element => {
    const data: Announcement = props.announcement;

    return (
        <div className="card">
            <div className="card-headers">
                <div className="tag-section">
                    {getTags(data.tags)}
                </div>
                <h1 className="title">{data.title}</h1>
                <div className="card-authors">
                    <div className="card-authors-image">
                        <Link to={`/club/${data.organization.slug}`}><img className="circle" src={data.organization.banner.src.href} /></Link>
                    </div>
                    <div className="card-authors-text">
                        <Link to={`/club/${data.organization.slug}`} className="link">{data.organization.name}</Link>,
                        <Link to={`/user/${data.author.slug}`} className="link">{data.author.name}</Link>
                        <br />
                        • {data.created.toString()}
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
