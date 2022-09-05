import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useQuery } from "../../util/query";
import { AnnouncementFeeds } from "./feeds";
import { AnnouncementFeed } from "../../util/models";

export const Announcements = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");

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
                        <div className="card">
                            <div className="card-headers">
                                <div className="tag-section">
                                    <p className="tag" style={{ backgroundColor: "#ffccce" }}>club applications</p>
                                    <p className="tag" style={{ backgroundColor: "#f7ccff" }}>accepting applications</p>
                                    <p className="tag" style={{ backgroundColor: "#f3ccff" }}>applications</p>
                                </div>
                                <h1 className="title">Project Metropolis - NOW HIRING!</h1>
                                <div className="card-authors">
                                    <div className="card-authors-image">
                                        <a href="https://maclyonsden.com/club/metropolis"><img className="circle" src="./Announcements _ Metropolis_files/1ba64f684a334d26bd87add205e97154.png" /></a>
                                    </div>
                                    <div className="card-authors-text">
                                        <a href="https://maclyonsden.com/club/metropolis" className="link">Project Metropolis</a>,
                                        <a href="https://maclyonsden.com/user/misheel.bt" className="link">Misheel Batkhuu</a>
                                        <br />
                                        {/*<dot>•</dot>*/} • Jul. 15, 2022, 12:05 pm
                                        {/* <!--
                                        (Edited)
                                        --> */}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card-body">
                                <p>Aloha Mac Lyons!<br />Project Metropolis doesn't run itself - behind Mac Lyons' Den young humans are hard at work. In hardly a year, our tightly-knit team developed the Project Metropolis label and everything with it - app, website, podcasts, playlists, and doodle games.<br />Today we are imploring you to apply so you can join in the action!<br />Choose this fulfilling highlight to your high school years, collect transferable skills for any field and application, and create memories to last a lifetime.<br />Bring your vision inspired by passion and fueled by courage. Frontend, Backend, App, Content, and/or Art has a place for your authentic self. Apply today: https://forms.gle/MLrFckYTyYJ3R5KdA</p>
                            </div>
                            <br />
                            <a className="link" href="https://maclyonsden.com/announcement/216">See announcement <i className="zmdi zmdi-chevron-right"></i></a>
                        </div>

                        <div className="card">
                            <div className="card-headers">
                                <div className="tag-section">

                                    <p className="tag" style={{ backgroundColor: "#e4ffcc" }}>visual art &amp; photography</p>

                                    <p className="tag" style={{ backgroundColor: "#ccffeb" }}>languages &amp; writing</p>

                                    {/* <p className="tag" style="background-color:#f9ccff">cultural &amp; community</p>
            
            <p className="tag" style="background-color:#cce2ff">news</p>
            
            <p className="tag" style="background-color:#ffe8cc">spirit</p>
            
            <p className="tag" style="background-color:#faffcc">social</p> */}

                                </div>
                                <h1 className="title">Issue 4 is here!</h1>
                                <div className="card-authors">
                                    <div className="card-authors-image">
                                        <a href="https://maclyonsden.com/club/the-lyon"><img className="circle" src="./Announcements _ Metropolis_files/83522403688c489096bb13b7e56ed6b1.png" /></a>
                                    </div>
                                    <div className="card-authors-text">
                                        <a href="https://maclyonsden.com/club/the-lyon" className="link">The Lyon</a>,
                                        <a href="https://maclyonsden.com/user/Kayla" className="link">Kayla Albin-Smith</a>
                                        <br />
                                        {/*<dot>•</dot>*/} Jun. 30, 2022, 7:27 pm
                                        {/* <!--
                (Edited)
                --> */}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="card-body">
                                <p>Issue 4 of the Lyon is here! Click the link below to read.<br />https://drive.google.com/file/d/1YyxqnbjOSZ29YBQVKDKRF5OZwFnBdmzX/view?usp=sharing</p>
                            </div>
                            <br />
                            <a className="link" href="https://maclyonsden.com/announcement/215">See announcement <i className="zmdi zmdi-chevron-right"></i></a>
                        </div>
                    </div>
                </div>

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
            </div>
        </>
    );
}
