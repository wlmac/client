import * as React from "react";
import { Link, NavigateFunction, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "../../util/query";
import { AnnouncementFeeds } from "./feeds";
import { AnnouncementFeed, AnnouncementInputs } from "../../util/models";
import Announcement from "../../util/core/interfaces/announcement";
import Organization from "../../util/core/interfaces/organization";
import MembershipStatus from "../../util/core/misc/membership";
import Media from "../../util/core/misc/media";
import Tag from "../../util/core/interfaces/tag";
import { getTags, TagElement } from "../../util/core/tags";
import { Session, SessionContext, User } from "../../util/core/session";
import Routes from "../../util/core/misc/routes";
import { loggedIn } from "../../util/core/AuthService";

import { useForm, SubmitHandler } from "react-hook-form";
import { dateFormat } from "../../util/core/misc/date";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, ownerDocument } from "@mui/material";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import './index.scss';

const ANN_FETCHLIMIT = 10; // how many anns to fetch each api request

export const Announcements = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const initMount = useRef(true);

    const [feeds, setFeeds] = React.useState(AnnouncementFeeds);
    const [curContent, setCurContent] = React.useState({
        isFeed: true, // true = is a feed, false = is a tag
        feed: {} as AnnouncementFeed, // default is all
        tag: {} as Tag, // the tag object
    })
    const [openCreator, setOpenCreator] = React.useState(false);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            //console.log(editorRef.current.getContent());
        }
    };

    React.useEffect(() => {
        if (searchParams.get("tag")) {
            let filtered = session.allTags.filter(e => e.name === searchParams.get("tag"));
            setCurContent({
                isFeed: false,
                feed: {} as AnnouncementFeed,
                tag: filtered.length == 0 ? {} as Tag : filtered[0], // the tag object
            });
        }
    }, [session.allTags]);

    React.useEffect(() => {
        if (session.user.id) {
            setFeeds((curFeeds) => {
                // delete existing "my" feed
                let removeMy = curFeeds.filter(e => e.id !== "my");
                removeMy.push({
                    id: 'my',
                    text: "MY FEED",
                    filters: (session.user.organizations) ? session.user.organizations.map(e => { return '&organization=' + e }).join('') : ''
                });
                return removeMy;
            })
        }
    }, [session.user]);

    function syncParamWithContent() {
        if (searchParams.get('feed')) {
            let feedlist = feeds.filter(e => e.id === searchParams.get("feed"));
            setCurContent({
                isFeed: true, // true = is a feed, false = is a tag
                feed: feedlist.length == 0 ? feeds[0] : feedlist[0], // default is all (0 index)
                tag: {} as Tag, // the tag object
            });
        }
        else if (searchParams.get("tag")) {
            let filtered = session.allTags.filter(e => e.name === searchParams.get("tag"));
            setCurContent({
                isFeed: false,
                feed: {} as AnnouncementFeed,
                tag: filtered.length == 0 ? {} as Tag : filtered[0], // the tag object
            });
        }
    }

    React.useEffect(() => {
        if (initMount.current) {
            initMount.current = false;
            //here we "clean up" the searchparam
            if (searchParams.get("feed")) {
                let feedlist = feeds.filter(e => e.id === searchParams.get("feed"));
                if (feedlist.length == 0 && searchParams.get("feed") !== "my") { // my is a special feed
                    setSearchParams(createSearchParams([["feed", "all"]]));
                }
                else {
                    if (Array.from(searchParams.keys()).length == 1) { // if the only query param is "feed"
                        syncParamWithContent();
                    }
                    else { // because there is another param we will reset it forcefully which also triggers a rerender from the searchParam state
                        setSearchParams(createSearchParams([["feed", searchParams.get('feed') as string]]));
                    }
                }
            }
            else if (searchParams.get("tag")) {
                // because it is a tag it may take some time to cache the actual tag value
                if (Array.from(searchParams.keys()).length == 1) { // if the only query param is "tag"
                    syncParamWithContent();
                }
                else { // because there is another param we will reset it forcefully which also triggers a rerender from the searchParam state
                    setSearchParams(createSearchParams([["tag", searchParams.get('tag') as string]]));
                }
            }
            else {
                setSearchParams(createSearchParams([["feed", "all"]]));
            }
        }
        else {
            syncParamWithContent();
        }
    }, [searchParams, feeds]);

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    return (
        <>
            <link rel="stylesheet" href="static/css/announcement-list.css" />
            {/* <AnnouncementCreator
                openCreator={openCreator}
                setOpenCreator={setOpenCreator}
            /> */}

            <div className="container">
                <div className="headers header-row">
                    <ul>{
                        //this is the header
                        feeds.map((feed: AnnouncementFeed): JSX.Element => {
                            const headerClass: string =
                                (curContent.isFeed && feed.id === curContent.feed.id) ? "header header-active" : "header";
                            return (
                                <li
                                    key={feed.id}
                                    className={headerClass}
                                    onClick={(): void => {
                                        setSearchParams(createSearchParams([["feed", feed.id]]));
                                    }}
                                >
                                    {feed.text}
                                </li>
                            );
                        })
                    }
                        {
                            !curContent.isFeed ? <li
                                key={curContent.tag.name}
                                className={"header header-active"}
                                onClick={(): void => {
                                    setSearchParams(createSearchParams([["tag", curContent.tag.name]]));
                                }}
                            >
                                TAG: {curContent.tag.name ? curContent.tag.name.toUpperCase() : 'Loading...'}
                            </li> : <></>
                        }</ul>
                    {/* <a
                        className="btn-small waves-light red"
                        href="#modal1"
                        onClick={(ev) => {
                            ev.preventDefault();
                            if (!loggedIn()) {
                                nav("/accounts/login");
                                return;
                            }
                            M.Modal.getInstance(
                                document.getElementById("announcement-creator")!
                            ).open();
                        }}
                    >
                        <i className="material-icons">add</i>
                    </a> */}
                </div>
                <div className="card-container">
                    <div className="cards" id="cards-all">
                        <AnnouncementList curContent={curContent} searchParams={searchParams} />
                    </div>
                </div>
            </div>
        </>
    );
};

const AnnouncementList = (props: any): JSX.Element => {
    const session: Session = React.useContext(SessionContext);

    const [announcements, setAnnouncements] = React.useState([] as any[]);
    let [offset, setOffset] = React.useState(0);

    function fetchAnns(append: boolean) {
        let param = '';
        if (!props.curContent.isFeed && props.curContent.tag.id) {
            param = `&tags=${props.curContent.tag.id}`;
        }
        else if (props.curContent.isFeed) {
            if (props.curContent.feed.id === "my" && (!session.user.organizations || session.user.organizations.length == 0)) {
                // dont display anns if there are on their own feed but havent subscribed to any orgs
                setAnnouncements([]);
                setOffset(-1);
                //console.log('hi')
                return;
            }
            else {
                param = props.curContent.feed.filters ?? '';
            }
        }
        const fetchURL = `${Routes.OBJECT}/announcement?limit=${ANN_FETCHLIMIT}&offset=${Math.max(offset, 0)}${param}`;
        session
            .request('get', fetchURL)
            .then((res) => {
                /*console.log(fetchURL);
                console.log(offset);
                console.log(param);*/
                setAnnouncements((prevAnns) => {
                    if (append) {
                        return prevAnns.concat(res.data.results);
                    }
                    else {
                        return res.data.results;
                    }
                });
                setOffset((prevOffset) => {
                    if (res.data.count - prevOffset > ANN_FETCHLIMIT) { // there are more anns!
                        return prevOffset + ANN_FETCHLIMIT;
                    }
                    else {
                        //console.log('setting -1')
                        return -1;
                    }
                });
            });
    }

    /*React.useEffect(() => {
        console.log('state change ' + offset)
    }, [offset])*/

    React.useEffect(() => {
        fetchAnns(false);
        document.removeEventListener('scroll', trackScrolling);
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [props.curContent]);

    function isBottom(el: any) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    function trackScrolling() {
        const wrappedElement = document.getElementById('annlist');
        if (isBottom(wrappedElement)) {
            //reached bottom!
            //console.log(offset)
            if (offset != -1) { // not -1 means there are more anns to fetch
                fetchAnns(true);
            }
            document.removeEventListener('scroll', trackScrolling);
        }
    }

    return <div id="annlist">
        {
            announcements.length == 0 ? <div>
                There are no announcements to be shown at this time
            </div> :
                announcements.map((announcement: Announcement): JSX.Element => {
                    let current_tags: Tag[] = [];
                    for (let i = 0; i < announcement.tags.length; i++) {
                        for (let j = 0; j < session.allTags.length; j++) {
                            if (announcement.tags[i] == (session.allTags[j] as Tag).id) {
                                current_tags.push(session.allTags[j]);
                            }
                        }
                    }
                    return (
                        <AnnouncementElement
                            key={announcement.id}
                            announcement={announcement}
                            tags={current_tags}
                        />
                    );
                })
        }
    </div>
};

const AnnouncementElement = (props: {
    announcement: Announcement;
    tags: Tag[];
}): JSX.Element => {
    const nav: NavigateFunction = useNavigate();

    const data: Announcement = props.announcement;
    const session: Session = React.useContext(SessionContext);
    let organization: Organization = session.allOrgs.find((organization: Organization) => organization.id === data.organization)!;
    let author: User = session.allUsers.find((user: User) => user.id === data.author)!;

    return organization && author ? (
        <div className="card">
            <div className="card-headers">
                <div className="tag-section">
                    {props.tags.map((tag: Tag): JSX.Element => {
                        return <a className="tag-link" key={tag.id} href={`/announcements?tag=${tag.name}`} onClick={(ev) => {
                            ev.preventDefault();
                            nav(`/announcements?tag=${tag.name}`);
                        }}>
                            <TagElement tag={tag} />
                        </a>;
                    })}
                </div>
                <h1 className="title">{data.title}</h1>
                <div className="card-authors">
                    <div className="card-authors-image">
                        <Link to={`/club/${organization.slug}`}><img className="circle" src={author.gravatar_url} /></Link>
                    </div>
                    <div className="card-authors-text">
                        <Link to={`/club/${organization.slug}`} className="link">{organization.name}</Link>,
                        <Link to={`/user/${author.username}`} className="link">{`${author.first_name} ${author.last_name}`}</Link>
                        <br />
                        • {new Date(data.created_date).toLocaleTimeString(undefined, dateFormat)}
                    </div>
                </div>
            </div>
            <hr />
            <div className="card-body">{data.body}</div>
            <br />
            <Link className="link" to={`/announcement/${data.id}`}>
                See announcement <i className="zmdi zmdi-chevron-right"></i>
            </Link>
        </div>
    ) : <></>;
};

// const AnnouncementCreator = (props: {
//     openCreator: boolean;
//     setOpenCreator: React.Dispatch<any>;
// }): JSX.Element => {
//     const openCreator: boolean = props.openCreator,
//         setOpenCreator: React.Dispatch<any> = props.setOpenCreator;
//     // if (!openCreator) return <></>

//     const [isPublic, setIsPublic] = React.useState(false);
//     const session: Session = React.useContext(SessionContext);

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm<AnnouncementInputs>();
//     const [error, setError] = React.useState("");

//     const [selected, setSelected] = React.useState<string[]>([]);
//     const names = session.allOrgs.map((organization: Organization): string => {
//         return organization.name;
//     });

//     const onCreate = (data: AnnouncementInputs): void => {
//         // console.log("Submitted data:", data);
//         session
//             .postAPI(`${Routes.OBJECT}/announcement/new`, {
//                 ...data,
//             })
//             .then(() => {
//                 console.log("Announcement created successfully");
//             })
//             .catch((err) => {
//                 console.log("Error:", err);
//                 // session.refreshAuth();
//             });
//     };

//     const ITEM_HEIGHT = 48;
//     const ITEM_PADDING_TOP = 8;
//     const MenuProps = {
//         PaperProps: {
//             style: {
//                 maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//                 width: 250,
//             },
//         },
//     };

//     const handleChange = (event: SelectChangeEvent<typeof selected>) => {
//         const {
//             target: { value },
//         } = event;
//         setSelected(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );
//     };

//     return (
//         <div id="announcement-creator" className="modal">
//             <div className="modal-top modal-header">
//                 <h5 className="header-announcement">Add Announcement</h5>
//             </div>
//             <form
//                 className="signup"
//                 onSubmit={handleSubmit(onCreate)}
//                 style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
//             >
//                 <div className="row">
//                     <div className="input-field col s12">
//                         <label htmlFor="id_title">Title:</label>
//                         <input
//                             {...register("title")}
//                             type="text"
//                             name="title"
//                             required={true}
//                             id="id_title"
//                         />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <>
//                         <Editor
//                             apiKey="your-api-key"
//                             onInit={(evt, editor) => { }}
//                             init={{
//                                 height: 500,
//                                 menubar: false,
//                                 plugins: [
//                                     "advlist",
//                                     "autolink",
//                                     "lists",
//                                     "link",
//                                     "image",
//                                     "charmap",
//                                     "preview",
//                                     "anchor",
//                                     "searchreplace",
//                                     "visualblocks",
//                                     "code",
//                                     "fullscreen",
//                                     "insertdatetime",
//                                     "media",
//                                     "table",
//                                     "code",
//                                     "help",
//                                     "wordcount",
//                                 ],
//                                 toolbar:
//                                     "undo redo | blocks | " +
//                                     "bold italic forecolor | alignleft aligncenter " +
//                                     "alignright alignjustify | bullist numlist outdent indent | " +
//                                     "removeformat | help",
//                                 content_style:
//                                     "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//                             }}
//                         />
//                     </>
//                 </div>
//                 <div className="row">
//                     <div className="input-field col s12">
//                         <label htmlFor="id_org">Organization:</label>
//                         <br />
//                         <select {...register("organization")} className="browser-default">
//                             {
//                                 session.allOrgs.map((org: Organization) => {
//                                     return <option key={org.id} value={org.id}>{org.name}</option>
//                                 })
//                             }
//                         </select>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="input-field col s12">
//                         <label htmlFor="id_show_after">Show After:</label>
//                         <input
//                             {...register("show_after")}
//                             type="text"
//                             name="show_after"
//                             minLength={1}
//                             required={true}
//                             id="id_show_after"
//                         />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="input-field col s12">
//                         <label htmlFor="id_supervisor">Supervisor:</label>
//                         <input
//                             {...register("supervisor")}
//                             type="text"
//                             name="supervisor"
//                             minLength={1}
//                             required={true}
//                             id="id_supervisor"
//                         />
//                     </div>
//                 </div>
//                 {error && (
//                     <span className="form-error">
//                         <div className="form-errors">
//                             <i className="material-icons">warning</i>
//                             <>{error}</>
//                         </div>
//                     </span>
//                 )}
//                 <div className="modal-footer">
//                     <a href="#!" className="modal-close waves-effect waves-red btn-flat">
//                         Cancel
//                     </a>
//                     <button className="waves-effect waves-green btn" type="submit">
//                         Create!
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );

//     // return (
//     //     <div className="popup">
//     //         <div className="modal-a">
//     //             <div className="modal-top modal-header">
//     //                 <h5 className="header-announcement">Add Announcement</h5>
//     //                 <a className="waves-effect waves-light btn" onClick={(ev: React.MouseEvent) => {
//     //                     ev.preventDefault();
//     //                     setOpenCreator(false);
//     //                 }}>Cancel</a>
//     //             </div>
//     //             <div className="modal-content">
//     //                 <div className="form input-row">
//     //                     <h6 className="form-label">Organization:</h6>
//     //                     <input type="text" className="textbox"></input>
//     //                 </div>
//     //                 <div className="form input-row">
//     //                     <h6 className="form-label">Title:</h6>
//     //                     <input type="text"></input>
//     //                 </div>
//     //                 <div className="form input-row">
//     //                     <h6 className="form-label">Body:</h6>
//     //                     <input type="text"></input>
//     //                 </div>
//     //                 <div className="form input-row">
//     //                     <h6 className="form-label">Tags:</h6>
//     //                     <input type="text"></input>
//     //                 </div>
//     //                 <div className="form input-row">
//     //                     <h6 className="form-label">Public:</h6>
//     //                     <label>
//     //                         <input type="checkbox" className="filled-in" onChange={(ev) => setIsPublic(ev.target.checked)} />
//     //                         <span>Filled in</span>
//     //                     </label>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </div>
//     // );
// };
