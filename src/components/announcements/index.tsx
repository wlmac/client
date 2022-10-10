import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "../../util/query";
import { AnnouncementFeeds } from "./feeds";
import { AnnouncementFeed } from "../../util/models";
import Announcement from "../../util/core/interfaces/announcement";
import User from "../../util/core/interfaces/user";
import Organization from "../../util/core/interfaces/organization";
import MembershipStatus from "../../util/core/misc/membership";
import Media from "../../util/core/misc/media";
import Tag from "../../util/core/interfaces/tag";

export const Announcements = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");

    const [openCreator, setOpenCreator] = React.useState(false);

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    const header = (currentFeed: string | null): Array<JSX.Element> => {
        return AnnouncementFeeds.map((feed: AnnouncementFeed): JSX.Element => {
            const headerClass: string = feed.id === currentFeed ? "header active" : "header";
            return <li key={feed.id} className={headerClass} onClick={(): void => nav(`/announcements?feed=${feed.id}`)}>{feed.text}</li>
        });
    }

    return (
        <>
            <link rel="stylesheet" href="static/css/announcement-list.css" />
            <AnnouncementCreator openCreator={openCreator} setOpenCreator={setOpenCreator} />
            <div className="container">

                <div className="headers">
                    <ul>
                        {header(feed)}
                    </ul>

                    {/* <script type="module">
            import { loadCheck, mapSetup } from "/static/core/js/announcement/lazy.js";
            const feeds = mapSetup(
                [
                    "all",
                    "school",
                    "studentcouncil",
                ],
                4,
                2,
            );
            const margin = 300;
            let dontLoad = false;
            async function listen() {
                if (!dontLoad)
                    if (loadCheck(margin)) {
                        dontLoad = true;
                        const urlParams = new URLSearchParams(window.location.search);
                        await feeds.get(urlParams.get("feed"))()
                        dontLoad = false;
                    }
            }
            window.addEventListener("scroll", listen);
        </script> */}
                    {/* <script>
            $(document).ready(function() {
                var urlParams = new URLSearchParams(window.location.search);
                if(!urlParams.get("feed")) {
                    $("#all").addClass("active");
                    urlParams.set("feed", "all");
                }
                history.replaceState(null, null, "?"+urlParams.toString());
                $(".header").click(function() {
                    $(".header").removeClass("active");
                    $(this).addClass("active");
                    $(".cards").hide();
                    $("#cards-"+this.id).show();
                    urlParams.set("feed", this.id);
                    history.replaceState(null, null, "?"+urlParams.toString());
                    /* to-do: search bar, DNR
                    $("#search-bar").val("");
                    var urlParams = new URLSearchParams(window.location.search);
                    urlParams.delete("ft");
                    urlParams.set("q", "");
                    history.replaceState(null, null, "?"+urlParams.toString());
                    
                });
            });
        </script> */}
                </div>
                <div className="card-container">
                    {/* <!-- to-do: search bar, DNR
        <div className="search-items">
            <div className="input-field">
                <form className="search-form" method="get">
                    <input id="search-bar" type="text" name="q" placeholder="Search">
                    <button id="search-button" type="submit"><span className="material-icons md-24 md-bold">search</span></button>
                </form>
            </div>
            to-do: filter tags, DNR
            <div className="filter dropdown">
                <span className="anchor">Filter Tags <span className="material-icons md-24">arrow_drop_down</span></span>
            </div>
        </div>
        --> */}
                    <div className="cards" id="cards-all">
                        <AnnouncementList />
                    </div>
                </div >

                {/* to-do: search bar, DNR
        <div className="cards" id="cards-search">
            
            <div className="message">There are no announcements that match your search terms</div>
            
        </div> */}

                {/* <script>
            $(document).ready(function() {
                var urlParams = new URLSearchParams(window.location.search);
                $(".cards").hide();
                if(!$("#cards-"+urlParams.get("feed")).length) {
                    urlParams.set("feed", "all");
                    history.replaceState(null, null, "?"+urlParams.toString());
                } 
                $("#cards-"+urlParams.get("feed")).show(); //remove when search reimplemented
                $(".header").removeClass("active");
                $("#"+urlParams.get("feed")).addClass("active");
                $(".card-authors-text").find("a").addClass("link");
                /* to-do: search bar, DNR
                var urlParams = new URLSearchParams(window.location.search);
                if(urlParams.get("q")) {
                    if(urlParams.get("ft") != "get") {
                        $("#search-bar").val(urlParams.get("q").split("+").join(" "));
                    }
                    $(".header").removeClass("active");
                    $("#all").addClass("active");
                    $("#cards-search").show();
                } else {
                    $("#cards-all").show();
                }
            });
        </script> */}
            </div >
        </>
    );
}

const AnnouncementList = (): JSX.Element => {
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
    return (
        <AnnouncementElement announcement={announcement} />
    )
}

const AnnouncementElement = (props: { announcement: Announcement }): JSX.Element => {
    const data: Announcement = props.announcement;

    const getTags = (tags: Array<Tag>): Array<JSX.Element> => {
        return tags.map((tag: Tag): JSX.Element => {
            return <p className="tag" style={{ backgroundColor: tag.color.value }}>{tag.name}</p>;
        });
    }

    return (
        <div className="card">
            <div className="card-headers">
                <div className="tag-section">
                    {getTags(data.tags)}
                </div>
                <h1 className="title">{data.title}</h1>
                <div className="card-authors">
                    <div className="card-authors-image">
                        <Link to={`/club/${data.organization.slug}`}><img className="circle" src={data.organization.banner.src.href} /></Link>
                    </div>
                    <div className="card-authors-text">
                        <Link to={`/club/${data.organization.slug}`} className="link">{data.organization.name}</Link>,
                        <Link to={`/user/${data.author.slug}`} className="link">{data.author.name}</Link>
                        <br />
                        • {data.created.toString()}
                    </div>
                </div>
            </div>
            <hr />
            <div className="card-body">
                {data.body}
            </div>
            <br />
            <Link className="link" to={`/announcement/${data.id}`}>See announcement <i className="zmdi zmdi-chevron-right"></i></Link>
        </div>
    );
}

const AnnouncementCreator = ({ openCreator, setOpenCreator }): JSX.Element => {
    if (!openCreator) return <></>

    return (
        <div className="popup">
            <div className="modal-a">
                <div className="modal-top">
                    <h5 className="header-announcement">Add Announcement</h5>
                    <button onClick={() => setOpenCreator(false)} className="cancel">cancel</button>
                </div>
                <div className="modal-content">
                    <div className="form">
                        <div className="input-row">
                            <h6 className="form-label">Organization</h6>
                            <input type="text" className="textbox"></input>
                        </div>
                    </div>
                    <div className="form">
                        <div className="input-row">
                            <h6 className="form-label">Title</h6>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="form">
                        <div className="input-row">
                            <h6 className="form-label">Body</h6>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="form">
                        <div className="input-row">
                            <h6 className="form-label">Tags</h6>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="form">
                        <h6 className="form-label">Public</h6>
                        <input type="checkbox" className="toggle" />
                    </div>
                </div>
            </div>
        </div>

    );
}
