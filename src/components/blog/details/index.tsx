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
import { loggedIn } from "../../../util/core/AuthService";
import { NotFound } from "../../notfound";

export const BlogDetails = (): JSX.Element => {
    const { slug } = useParams();

    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const [post, setPost] = React.useState({} as BlogPost);
    const [tags, setTags] = React.useState([] as Array<Tag>);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post/retrieve/${slug}?lookup=slug`;
        session.request('get', fetchURL).then((res) => {
            const current_post: BlogPost = res.data as BlogPost;
            setPost(current_post);
        });
    }, []);

    return "slug" in post ? (
        <>
            <link rel="stylesheet" href="/resources/static/css/blog-detail.css" />
            <div className="container">
                <div className="card-container">
                    <img className="card-image" src={post.featured_image+"?w=800&h=&fmt=webp"} />
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
                            <Link to={`/user/${post.author.username}`}><img className="circle" src={post.author.gravatar_url} /></Link>
                        </div>
                        <div className="card-authors-text">
                            <Link to={`/user/${post.author.username}`} className="link">{`${post.author.first_name} ${post.author.last_name}`}</Link>
                            <>&bull; {new Date(post.created_date).toLocaleTimeString(undefined, dateFormat)}  </>
                            <>&bull; estimated reading time: {Math.ceil(post.body.trim().split(/\s+/).length / 225)} min</>
                            {/* {post.created_date !== post.last_modified_date && " (Edited)"} */}
                        </div>
                        {
                            (loggedIn() && (session.user.is_staff || session.user.id == post.author.id)) &&
                            <span className="view-counter"><strong>{post.views}</strong> views</span>
                        }
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
    )
    :
    <>
        <NotFound/>
    </>
    ;
}
