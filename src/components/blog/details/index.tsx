import * as React from "react";
import { AxiosPromise, default as axios } from "axios";

import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import BlogPost from "../../../util/core/interfaces/blogpost";
import Organization from "../../../util/core/interfaces/organization";
import Tag from "../../../util/core/interfaces/tag";
import Routes from "../../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../../util/core/session";

export const BlogDetails = (): JSX.Element => {
    const { id } = useParams();

    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const [post, setPost] = React.useState({} as BlogPost);
    const [author, setAuthor] = React.useState({} as User);
    const [tags, setTags] = React.useState([] as Array<Tag>);
    const [execs, setExecs] = React.useState([] as Array<User>);
    const [members, setMembers] = React.useState([] as Array<User>);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/blog-post/retrieve/${id}`;
        session.getAPI(fetchURL).then((res) => {
            const current_post: BlogPost = res.data as BlogPost;
            setPost(current_post);

            // Author
            session.getAPI(`${Routes.USER}/${current_post.author}`).then((res) => {
                console.log(res.data);
                setAuthor(res.data);
            }).catch(() => {
                session.refreshAuth();
            });

            // Tags
            session.getAPI(`${Routes.OBJECT}/tag`).then((res) => {
                const tags_data: Tag[] = res.data.results;
                const current_tags: Tag[] = [];
                for (let i = 0; i < current_post.tags.length; i++) {
                    for (let j = 0; j < tags_data.length; j++) {
                        if (current_post.tags[i] === (tags_data[j] as Tag).id) {
                            current_tags.push(tags_data[j]);
                            break;
                        }
                    }
                }
                setTags(current_tags);
            }).catch(() => {
                session.refreshAuth();
            });
        }).catch((err) => {
            session.refreshAuth();
        });
    }, []);

    return (
        <>
            <div className="container">
                <div className="card-container">
                    <img className="card-image" src="/img/default.png" />
                    <div className="tag-section">
                        <p className="tag" style={{ backgroundColor: "#ffcced" }}>test tag</p>
                        <p className="tag" style={{ backgroundColor: "#ccffe1" }}>test tag 2</p>
                    </div>
                    <h1 className="title">{post.title}</h1>
                    <div className="card-authors">
                        <div className="card-authors-image">
                            <a href={`/user/${post.author}`}><img className="circle" src="/img/test" /></a>
                        </div>
                        <div className="card-authors-text">
                            <a href={`/user/${post.author}`} className="link">{`${author.first_name} ${author.last_name}`}</a>
                            <br />
                            • {post.created_date}
                            {post.created_date !== post.last_modified_date && " (Edited)"}
                        </div>
                    </div>
                    <hr />
                    <div className="card-body">
                        <p>{post.body}</p>
                    </div>
                    <br />
                    <Link className="link" to="/blog"><i className="zmdi zmdi-chevron-left"></i> Return to Blog Posts</Link>
                </div>
            </div>
        </>
    );
}