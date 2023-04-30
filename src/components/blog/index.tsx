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
import { getTags, TagElement } from "../../util/core/tags";
import Markdown from "../markdown";
import { loggedIn } from "../../util/core/AuthService";
import { dateFormat } from "../../util/core/misc/date";

export const Blog = (): JSX.Element => {
    const session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    return (
        <>
            <link rel="stylesheet" href="static/css/blog-list.css" />
            <div className="container">
                <div className="card-container">
                    {BlogPosts()}
                </div>
            </div>
        </>
    );
}

const BlogPosts = (): JSX.Element[] => {
    const [posts, setPosts] = React.useState([]);
    const session: Session = React.useContext(SessionContext);

    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post`;
        session.getAPI(fetchURL).then((res) => {
            setPosts(res.data.results);
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

    return (
        posts.map((post: BlogPost) => {
            let current_tags: Tag[] = [];
            for (let i = 0; i < post.tags.length; i++) {
                for (let j = 0; j < tags.length; j++) {
                    if (post.tags[i] == (tags[j] as Tag).id) {
                        current_tags.push(tags[j]);
                    }
                }
            }
            return <BlogPostElement post={post} tags={current_tags} key={post.id} />;
        })
    );
}

const BlogPostElement = (props: { post: BlogPost, tags: Array<Tag> }): JSX.Element => {
    const post = props.post;
    const session: Session = React.useContext(SessionContext);
    let author: User = session.allUsers.find((user: User) => user.id === post.author)!;

    async function getAuthor() {
        const session: Session = React.useContext(SessionContext);
        const author = await session.getAPI(`${Routes.USER}/${post.author}`);
        return await author.data;
    }

    return author ? (
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
                        <div className="card-authors-image">
                            <Link to={`/user/${post.author}`}><img className="circle" src={author.gravatar_url} /></Link>
                        </div>
                        <div className="card-authors-text">
                            <Link to={`/user/${post.author}`} className="link">{author && `${author.first_name} ${author.last_name}`}</Link>
                            <br />
                            • posted {new Date(post.created_date).toLocaleTimeString(undefined, dateFormat)}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="card-body">
                <p>
                    {post.body}
                </p>
            </div>
            <br />
            <Link className="link" to={`/blog/${post.id}`}>Read full blog post <i className="zmdi zmdi-chevron-right"></i></Link>
        </div>
    ) : <></>;
}