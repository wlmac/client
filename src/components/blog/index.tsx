import * as React from "react";
import { default as axios } from 'axios';

import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import BlogPost from "../../util/core/interfaces/blogpost";
import Organization from "../../util/core/interfaces/organization";
import Tag from "../../util/core/interfaces/tag";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";
import Routes from "../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../util/core/session";
import { TagElement } from "../../util/core/tags";
import Markdown, { markdownToPlainText } from "../markdown";
import { loggedIn } from "../../util/core/AuthService";
import { dateFormat } from "../../util/core/misc/date";

const BLOG_FETCHLIMIT = 10; // how many anns to fetch each api request

export const Blog = (): JSX.Element => {
    const session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/blog-list.css" />
            <div className="container">
                <div className="card-container">
                    <BlogPosts />
                </div>
            </div>
        </>
    );
}

const BlogPosts = () => {
    const session: Session = React.useContext(SessionContext);
    const [posts, setPosts] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [loadMsg, setLoadMsg] = React.useState("Loading...");

    const initLoadRef = React.useRef(false);

    function fetchBlog(offsetOverride?: number) {
        if (initLoadRef.current) {
            setLoadMsg("Loading more posts...");
        }
        const fetchURL = `${Routes.OBJECT}/blog-post?limit=${BLOG_FETCHLIMIT}&offset=${offsetOverride ?? Math.max(offset, 0)}`;
        session
            .request('get', fetchURL)
            .then((res) => {
                setPosts((prevPosts) => {
                    return prevPosts.concat(res.data.results);
                });
                setOffset((prevOffset) => {
                    if (res.data.count - prevOffset > BLOG_FETCHLIMIT) { // there are more anns!
                        document.addEventListener('scroll', trackScrolling);
                        setLoadMsg("Scroll down to load more posts...");
                        return prevOffset + BLOG_FETCHLIMIT;
                    }
                    else {
                        setLoadMsg("You've reached the end!");
                        return -1;
                    }
                });
                if (!initLoadRef.current) {
                    initLoadRef.current = true;
                }
            });
    }

    React.useEffect(() => {
        initLoadRef.current = false;
        fetchBlog();
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, []);

    const trackScrolling = React.useCallback(() => {
        const wrappedElement = document.getElementById('bloglist');
        if (wrappedElement!.getBoundingClientRect().bottom <= window.innerHeight) {
            //reached bottom!
            setOffset((offset) => { // since it is the function it has access to current state despite being rendered from initial state
                if (offset != -1 && initLoadRef.current) { // not -1 means there are more blogs to fetch
                    fetchBlog(offset);
                }
                return offset;
            })
            document.removeEventListener('scroll', trackScrolling);
        }
    }, []);

    return (
        <div id="bloglist">
            {
                posts.length == 0 ? 
                    <></>
                :
                    posts.map((post: BlogPost) => {
                        return <BlogPostElement post={post} tags={post.tags} key={post.id} />;
                    })
            }
            <div>
                {
                    (posts.length == 0 && initLoadRef.current) ? 'There are no blog posts to be shown at this time' : loadMsg
                }
            </div>
        </div>
    );
}

const BlogPostElement = (props: { post: BlogPost, tags: Array<Tag> }): JSX.Element => {
    const post = props.post;
    const session: Session = React.useContext(SessionContext);
    const time = Math.ceil(post.body.trim().split(/\s+/).length / 225);

    return (
        <>
            <div className="card">
                <div className="card-headers">
                    <img className="card-image" src={post.featured_image} />
                    <div className="card-text">
                        <div className="tag-section">
                            {
                                props.tags.map((tag: Tag) => {
                                    return <TagElement key={tag.id} tag={tag} />
                                })
                            }
                        </div>
                        <h1 className="title">{post.title}</h1>
                        <div className="card-authors">
                            <>
                                <div className="card-authors-image">
                                    <Link to={`/user/${post.author.username}`}><img className="circle" src={post.author.gravatar_url} /></Link>
                                </div>
                                <div className="card-authors-text">
                                    <Link to={`/user/${post.author.username}`} className="link">{`${post.author.first_name} ${post.author.last_name}`}</Link>
                                    <br />
                                    • {new Date(post.created_date).toLocaleTimeString(undefined, dateFormat)}  • estimated reading time: {time} min
                                </div>
                            </>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card-body">
                    <p>
                        {markdownToPlainText(post.body)}
                    </p>
                </div>
                <br />
                <Link className="link" to={`/blog/${post.slug}`}>Read full blog post <i className="zmdi zmdi-chevron-right"></i></Link>
            </div>
        </>
    );
}