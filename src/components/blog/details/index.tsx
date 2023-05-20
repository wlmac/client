import * as React from "react";
import { AxiosPromise, default as axios } from "axios";

import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import BlogPost from "../../../util/core/interfaces/blogpost";
import Organization from "../../../util/core/interfaces/organization";
import Tag from "../../../util/core/interfaces/tag";
import Routes from "../../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../../util/core/session";
import Markdown from "../../markdown";
import { dateFormat } from "../../../util/core/misc/date";
import { TagElement } from "../../../util/core/tags";

export const BlogDetails = (): JSX.Element => {
    const { slug } = useParams();

    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const [post, setPost] = React.useState({} as BlogPost);
    const [author, setAuthor] = React.useState({} as User);
    const [tags, setTags] = React.useState([] as Array<Tag>);
    const [execs, setExecs] = React.useState([] as Array<User>);
    const [members, setMembers] = React.useState([] as Array<User>);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post/retrieve/${slug}?lookup=slug`;
        session.request('get', fetchURL).then((res) => {
            const current_post: BlogPost = res.data as BlogPost;
            setPost(current_post);

            // Author
            session.request('get', `${Routes.USER}/retrieve/${current_post.author}`).then((res) => {
                setAuthor(res.data);
            }).catch(() => {
                session.refreshAuth();
            });
        }).catch((err) => {
            session.refreshAuth();
        });
    }, []);

    return author ? (
        <>
            <link rel="stylesheet" href="/static/css/blog-detail.css" />
            <div className="container">
                <div className="card-container">
                    <img className="card-image" src={post.featured_image} />
                    <div className="tag-section">
                        {
                            tags.map((tag: Tag) => {
                                return <TagElement key={tag.id} tag={tag} />
                            })
                        }
                    </div>
                    <h1 className="title">{post.title}</h1>
                    <div className="card-authors">
                        <div className="card-authors-image">
                            <Link to={`/user/${author.username}`}><img className="circle" src={author.gravatar_url} /></Link>
                        </div>
                        <div className="card-authors-text">
                            <Link to={`/user/${author.username}`} className="link">{`${author.first_name} ${author.last_name}`}</Link>
                            <br />
                            • {new Date(post.created_date).toLocaleTimeString(undefined, dateFormat)}
                            {/* {post.created_date !== post.last_modified_date && " (Edited)"} */}
                        </div>
                    </div>
                    <hr />
                    <div className="card-body">
                        <Markdown text={post.body} />
                    </div>
                    <br />
                    <Link className="link" to="/blog"><i className="zmdi zmdi-chevron-left"></i> Return to Blog Posts</Link>
                </div>
            </div>
        </>
    ) : <></>;
}