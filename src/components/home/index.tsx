import * as React from "react";

import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import { loggedIn } from "../../util/core/AuthService";
import Announcement from "../../util/core/interfaces/announcement";
import BlogPost from "../../util/core/interfaces/blogpost";
import Organization from "../../util/core/interfaces/organization";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";
import { Session, SessionContext, User } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";
import Event from "../../util/core/interfaces/event";
import Tag from "../../util/core/interfaces/tag";
import { dateFormat } from "../../util/core/misc/date";
import { Timetable } from "../../util/core/interfaces/timetable";
import { Course } from "../../util/core/interfaces/timetable";
import { ScheduleSlot } from "../../util/core/interfaces/schedule";
import { Schedule } from "./schedule";

export const Home = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    React.useEffect((): void => {
        document.title = "Home | Metropolis";
    }, []);

    const [post, setPost] = React.useState({} as BlogPost); // Featured BlogPost

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post?limit=1`;
        session.request('get', fetchURL).then((res: { data: { results: Array<BlogPost> } }) => {
            setPost(res.data.results[0]);
        });
    }, []);

    return (
        <div id="content-container">
            <Schedule />
            <div id="main-container">
                <FeaturedBlogPost post={post} />
                <div id="recent-events" className="card-list center-align">
                    <div className="cards-container">
                        <EventsFeed />
                    </div>
                    <Link className="full-content-page link" to="/calendar">View all events <i className="zmdi zmdi-chevron-right"></i></Link>
                </div>
                <hr style={{ margin: "10px calc(2% + 10px)", borderTopWidth: "2.5px", borderColor: "#d9d9d9" }} />
                <div id="recent-announcements" className="center-align">
                    <div id="announcements" className="cards-container">
                        {HomeAnnouncements()}
                    </div>
                    <Link className="full-content-page link" to="/announcements">View all announcements <i className="zmdi zmdi-chevron-right"></i></Link>
                </div>
            </div>
        </div>
    );
}

const FeaturedBlogPost = (props: { post: BlogPost }): JSX.Element => {
    const post = props.post;
    return (
        <div className="blog row">
            <div className="blog-content s5 col valign-wrapper left-align s5">
                <div className="blog-content-container">
                    <h4 className="title">{post.title}</h4>
                    <hr />
                    <div className="blog-body markdown-container">
                        <p>{post.body}</p>
                        <Link className="full-content-page link" to={`/blog/${post.slug}`}>Read full blog
                            post <i className="zmdi zmdi-chevron-right"></i></Link>
                    </div>
                </div>
            </div>
            <img className="blog-image hide-on-small-and-down col s7" src={post.featured_image} />
        </div>
    );
}

const EventsFeed = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);

    const [events, setEvents] = React.useState<Event[]>([]);
    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/event?limit=3`;
        session.request('get', fetchURL).then((res: { data: { results: Array<Event> } }) => {
            setEvents(res.data.results);
        });
    }, []);

    const Event = (props: { data: Event }): JSX.Element => {
        const data = props.data;
        let organization: Organization = session.allOrgs.find((organization: Organization) => organization.id === data.organization)!;
        let tag: Tag = session.allTags.find((tag: Tag) => tag.id === data.tags[0])!;

        const toTimeOnly = (dateTime: string): string => {
            const commaIdx = dateTime.indexOf(",");
            return dateTime.substring(commaIdx + 2);
        }

        return (
            <div className="event-card card ">
                <div className="event-time right-align valign-wrapper" style={{ backgroundColor: tag ? tag.color : "#ffffff" }}>
                    <div className="time-container">
                        <span className="date">{new Date(data.start_date).toLocaleDateString(undefined, {
                            year: "numeric", month: "long", day: "numeric"
                        })}</span><br />
                        <span className="time">{toTimeOnly(new Date(data.start_date).toLocaleDateString(undefined, {
                            hour: "numeric", minute: "numeric"
                        }))}</span><br />
                        <span className="intermediate">to</span><br />
                        <span className="date">{new Date(data.end_date).toLocaleDateString(undefined, {
                            year: "numeric", month: "long", day: "numeric"
                        })}</span><br />
                        <span className="time">{toTimeOnly(new Date(data.end_date).toLocaleDateString(undefined, {
                            hour: "numeric", minute: "numeric"
                        }))}</span><br />
                    </div>
                </div>
                <div className="event-description left-align">
                    <h5 className="title truncate">{data.name}</h5>
                    <hr />
                    <div className="authors">
                        <div className="authors-image">
                            <Link to={`/club/${organization ? organization.slug : ''}`}>
                                <img className="circle" src={organization ? organization.icon : ""} alt={`${organization ? organization.name : ""} logo`} />
                            </Link>
                        </div>
                        <div className="authors-text">
                            <Link to={`/club/${organization ? organization.slug : ''}`}>{organization ? organization.name : ""}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {events.map((data: Event, idx: number): JSX.Element => {
                return <Event data={data} key={idx} />
            })}
        </>
    );
}

const HomeAnnouncements = (): JSX.Element[] => {
    const [announcements, setAnnouncements] = React.useState([] as Array<Announcement>);
    const session: Session = React.useContext(SessionContext);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/announcement?limit=3`;
        session.request('get', fetchURL).then((res: { data: { results: Array<Announcement> } }) => {
            setAnnouncements(res.data.results);
        });
    }, []);

    return announcements.map((announcement: Announcement): JSX.Element => {
        return <HomeAnnouncement key={announcement.id} announcement={announcement} />
    });
}

const HomeAnnouncement = (props: { announcement: Announcement }): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const announcement = props.announcement;
    let organization: Organization = session.allOrgs.find((organization: Organization) => organization.id === announcement.organization)!;
    let [tag, setTag] = React.useState({} as Tag);
    React.useEffect(() => {
        setTag(session.allTags.filter((tag: Tag) => tag.id == announcement.tags[0])[0]);
    }, [session.allTags]);

    return (
        <>
            <div className="announcement-card card left-align" style={{ borderColor: tag ? tag.color : "#ffffff" }}>
                <h5 className="title truncate">{announcement.title}</h5>
                <div className="authors">
                    <div className="authors-image">
                        <Link to={`/club/${organization ? organization.slug : ''}`}><img className="circle" src={organization ? organization.icon : "/"} /></Link>
                    </div>
                    <div className="authors-text">
                        <Link to={`/club/${organization ? organization.slug : ''}`}>{organization ? organization.name : ""}</Link>
                    </div>
                </div>
                <hr />
                <div className="announcement-description markdown-container">
                    <p>{announcement.body}</p>
                    <Link className="link" to={`/announcement/${announcement.id}`}>See announcement <i className="zmdi zmdi-chevron-right"></i></Link>
                </div>
            </div>
        </>
    );
}
