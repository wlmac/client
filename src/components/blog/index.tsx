import * as React from "react";
import { Link } from "react-router-dom";
import BlogPost from "../../util/core/interfaces/blogpost";
import Organization from "../../util/core/interfaces/organization";
import User from "../../util/core/interfaces/user";
import Media from "../../util/core/misc/media";
import MembershipStatus from "../../util/core/misc/membership";
import { SessionContext } from "../../util/core/session";

export const Blog = (): JSX.Element => {
    const session = React.useContext(SessionContext);
    console.log("Session:", session.user);

    return (
        <>
            <link rel="stylesheet" href="static/css/blog-list.css" />
            <div className="container">
                <div className="card-container">
                    <BlogPosts />
                </div>
            </div>
        </>
    );
}

const BlogPosts = (): JSX.Element => {
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
        <BlogPostElement post={blogpost} />
    )
}

const BlogPostElement = (props: { post: BlogPost }): JSX.Element => {
    const post = props.post;
    return (
        <div className="card">
            <div className="card-headers">
                <img className="card-image" src={post.featuredImage.href} />
                <div className="card-text">
                    <div className="tag-section">
                        {/* Tags */}
                    </div>
                    <h1 className="title">{post.title}</h1>
                    <div className="card-authors">
                        <div className="card-authors-image">
                            <Link to={`/user/${post.author.slug}`}><img className="circle" src={"/img/baf"} /></Link>
                        </div>
                        <div className="card-authors-text">
                            <Link to={`/user/${post.author.slug}`} className="link">{post.author.name}</Link>
                            <br />
                            • posted {post.created.toString()}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="card-body">
                <p>{post.body}</p>
            </div>
            <br />
            <Link className="link" to={`/blog/${post.slug}`}>Read full blog post <i className="zmdi zmdi-chevron-right"></i></Link>
        </div>
    );
}