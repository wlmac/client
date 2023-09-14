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
import { markdownToPlainText } from "../markdown";
import MiniCalendar from "./calendar/mini-calendar";
import { AnnouncementContainer } from "../announcements";

export const Home = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);

    React.useEffect((): void => {
        document.title = "Home | Metropolis";
    }, []);

    const [post1, setPost1] = React.useState({} as BlogPost); // Featured BlogPost 1
    const [post2, setPost2] = React.useState({} as BlogPost); // Featured BlogPost 2

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post?limit=2`;
        session.request('get', fetchURL).then((res: { data: { results: Array<BlogPost> } }) => {
            setPost1(res.data.results[0]);
            setPost2(res.data.results[1]);
        });
    }, []);

    return (
        <div id="content-container">
            <Schedule />
            <div id="main-container">                
                <div id="all-announcements">
                    <div className="morning-announcements">
                        <AnnouncementContainer/>
                    </div>
                    <div className="featured-blog-posts">
                        <div style={{marginBottom: "6.75%"}}>
                            <FeaturedBlogPost post={post1}/>
                        </div>
                        <div>
                            <FeaturedBlogPost post={post2} />
                        </div>
                    </div>
                </div> 

                <div id="mini-calendar" style={{marginLeft: "4%", marginRight: "4%", marginBottom: "3%"}}>
                    <MiniCalendar />
                </div>
            </div>
        </div>
    );
}

const FeaturedBlogPost = (props: { post: BlogPost }): JSX.Element => {
    const post = props.post;
    return (
        <div className="blog">
            <img className="blog-image" src={post.featured_image} />
            <div className="blog-content">
                <p className="title">{post.title}</p>
                <hr />
                <div className="blog-body">
                    <p>{markdownToPlainText(post.body)}</p>
                    <Link className="full-content-page link" to={`/blog/${post.slug}`}>Read full blog
                        post <i className="zmdi zmdi-chevron-right"></i></Link>
                </div>
            </div>
        </div>
    );
}