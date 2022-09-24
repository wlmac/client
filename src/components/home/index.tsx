import * as React from "react";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import Announcement from "../../util/core/interfaces/announcement";
import BlogPost from "../../util/core/interfaces/blogpost";
import Organization from "../../util/core/interfaces/organization";
import User from "../../util/core/interfaces/user";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";

export const Home = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    React.useEffect((): void => {
        document.title = "Home | Metropolis";
    }, []);

    const myUser: User = { id: 1, slug: "baf", name: ["baf1", "baf2"], bio: "baf", timezone: "baf", graduatingYear: 2023, organizations: [], following: [] };
    const myMedia: Media = new Media("http://localhost:8080/img/baf", 0);
    const myOrg: Organization = { name: "baf", id: 1, bio: "baf", footer: "baf", slug: "baf", hideMembers: false, membership: MembershipStatus.Open, owner: myUser, supervisors: [], execs: [], banner: myMedia, icon: myMedia, tags: [], urls: [] };
    const blogpost: BlogPost = {
        id: 1,
        author: myUser,
        organization: myOrg,
        created: new Date(),
        modified: new Date(),
        title: "baf",
        body: "baf",
        featuredImage: new URL("http://localhost:8080/img/baf"),
        slug: "baf",
        tags: [],
    }

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

                <FeaturedBlogPost post={blogpost} />

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
                        <a className="full-content-page link" href="/blog/sacred-silence-infographic">Read full blog
                            post <i className="zmdi zmdi-chevron-right"></i></a>
                    </div>
                </div>
            </div>
            <img className="blog-image hide-on-small-and-down col s7" src={`/media/featured_image/default.png`} />
        </div>
    );
}

const HomeAnnouncements = (): JSX.Element[] => {
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
    const announcements = [
        announcement, announcement,
    ];
    return announcements.map((announcement: Announcement): JSX.Element => {
        return <HomeAnnouncement key={announcement.id} announcement={announcement} />
    });
}

const HomeAnnouncement = (props: { announcement: Announcement }): JSX.Element => {
    const announcement = props.announcement;
    return (
        <>
            <div className="announcement-card card left-align" style={{ borderColor: "#ffccce" }}>
                <h5 className="title truncate">{announcement.title}</h5>
                <div className="authors">
                    <div className="authors-image">
                        <Link to={`/club/${announcement.organization.slug}`}><img className="circle" src="/img/baf" /></Link>
                    </div>
                    <div className="authors-text">
                        <Link to={`/club/${announcement.organization.slug}`}>{announcement.organization.name}</Link>
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
