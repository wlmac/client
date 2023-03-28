import * as React from "react";
import { default as axios } from "axios";

import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import { loggedIn } from "../../util/core/AuthService";
import Announcement from "../../util/core/interfaces/announcement";
import BlogPost from "../../util/core/interfaces/blogpost";
import Organization from "../../util/core/interfaces/organization";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";
import { Session, SessionContext, User } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";

export const Home = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    React.useEffect((): void => {
        document.title = "Home | Metropolis";
    }, []);

    const [post, setPost] = React.useState({} as BlogPost); // Featured BlogPost

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post`;
        axios.get(fetchURL).then((res: { data: { results: Array<BlogPost> } }) => {
            setPost(res.data.results[0]);
        });
    }, []);

    return (
        <div id="content-container">
            <div className="banner">
                <div className="background"><img src="/static/img/themes/banners/summer.jpg" /></div>
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
                            <Link to="/accounts/signup/">Sign up</Link> and add your timetable to see a personalized schedule here.
                        </span>
                    </div>
                </div>

            </div>
            <div id="main-container">
                <FeaturedBlogPost post={post} />
                <div id="recent-events" className="card-list center-align">
                    <div className="cards-container">
                        There are no events at this time.
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
                        <Link className="full-content-page link" to={`/blog/${post.id}`}>Read full blog
                            post <i className="zmdi zmdi-chevron-right"></i></Link>
                    </div>
                </div>
            </div>
            <img className="blog-image hide-on-small-and-down col s7" src={post.featured_image} />
        </div>
    );
}

const HomeAnnouncements = (): JSX.Element[] => {
    const [announcements, setAnnouncements] = React.useState([] as Array<Announcement>);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/announcement`;
        axios.get(fetchURL).then((res: { data: { results: Array<Announcement> } }) => {
            setAnnouncements(res.data.results.slice(0, 3));
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

    return organization ? (
        <>
            <div className="announcement-card card left-align" style={{ borderColor: "#ffccce" }}>
                <h5 className="title truncate">{announcement.title}</h5>
                <div className="authors">
                    <div className="authors-image">
                        <Link to={`/club/${announcement.organization}`}><img className="circle" src={organization && organization.banner} /></Link>
                    </div>
                    <div className="authors-text">
                        <Link to={`/club/${announcement.organization}`}>{organization.name}</Link>
                    </div>
                </div>
                <hr />
                <div className="announcement-description markdown-container">
                    <p>{announcement.body}</p>
                    <Link className="link" to={`/announcement/${announcement.id}`}>See announcement <i className="zmdi zmdi-chevron-right"></i></Link>
                </div>
            </div>
        </>
    ) : <></>;
}
