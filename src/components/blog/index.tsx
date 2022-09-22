import * as React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../util/models";

export const Blog = (): JSX.Element => {
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
    const post: BlogPost = {
        author: 1,
        organization: 1,
        tags: [1, 2, 3],
        status: "approved",
        featuredImage: "/img",
    };

    return (
        <BlogPostElement post={post} />
    )
}

const BlogPostElement = (props: { post: BlogPost }): JSX.Element => {
    const post = props.post;
    return (
        <div className="card">
            <div className="card-headers">
                <img className="card-image" src={post.featuredImage} />
                <div className="card-text">
                    <div className="tag-section">

                    </div>
                    <h1 className="title">Humans of WLMAC</h1>
                    <div className="card-authors">
                        <div className="card-authors-image">
                            <Link to="/user/carminite"><img className="circle" src="./Blog Posts _ Metropolis_files/c643df5412333b47a4d948c9f1712fa2.png" /></Link>
                        </div>
                        <div className="card-authors-text">
                            <Link to="/user/carminite" className="link">Bernie Chen</Link>
                            <br />
                            • posted Sep. 19, 2022, 12:16 am
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="card-body">
                <p>"I'm choking in this dress shirt already, what more do you want?"</p>
            </div>
            <br />
            <a className="link" href="https://maclyonsden.com/blog/HoW-11">Read full blog post <i className="zmdi zmdi-chevron-right"></i></a>
        </div>
    );
}