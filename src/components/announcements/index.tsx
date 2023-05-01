import * as React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
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

    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");
    const tag: string | null = query.get("tag");

    const [tagObj, setTagObj] = React.useState({} as Tag);
    const [openCreator, setOpenCreator] = React.useState(false);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            //console.log(editorRef.current.getContent());
        }
    };

    React.useEffect(() => {
        let filtered = session.allTags.filter(e => e.name === tag);
        setTagObj(filtered.length == 0 ? {} as Tag : filtered[0]);
    }, [session.allTags, tag]);

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    const header = (currentFeed: string | null): JSX.Element => {
        return <> {
            AnnouncementFeeds.map((feed: AnnouncementFeed): JSX.Element => {
                const headerClass: string =
                    feed.id === currentFeed ? "header header-active" : "header";
                return (
                    <li
                        key={feed.id}
                        className={headerClass}
                        onClick={(): void => {
                            nav(`/announcements?feed=${feed.id}`)
                        }}
                    >
                        {feed.text}
                    </li>
                );
            })
        }
            {
                session.user.organizations ? <li
                    key={"my"}
                    className={"my" === currentFeed ? "header header-active" : "header"}
                    onClick={(): void => {
                        nav(`/announcements?feed=my`);
                    }}
                >
                    MY FEED
                </li> : <></>
            }
            {
                tagObj.id ? <li
                    key={tagObj.name}
                    className={tagObj.name === currentFeed ? "header header-active" : "header"}
                    onClick={(): void => {
                        nav(`/announcements?tag=${tagObj.name}`);
                    }}
                >
                    TAG: {tagObj.name.toUpperCase()}
                </li> : <></>
            }
        </>;
    };

    return (
        <>
            <link rel="stylesheet" href="static/css/announcement-list.css" />
            {/* <AnnouncementCreator
                openCreator={openCreator}
                setOpenCreator={setOpenCreator}
            /> */}

            <div className="container">
                <div className="headers header-row">
                    <ul>{header(tagObj.id ? tagObj.name : feed)}</ul>
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
                        <AnnouncementList tag={tagObj} feed={feed} />
                    </div>
                </div>
            </div>
        </>
    );
};

const AnnouncementList = (props: any): JSX.Element => {
    const session: Session = React.useContext(SessionContext);

    const [announcements, setAnnouncements] = React.useState([] as any[]);
    const [offset, setOffset] = React.useState(0);

    function fetchAnns(append: boolean) {
        console.log('fetching ' + append)
        let param = '';
        if (props.tag.id) {
            param = `&tag=${props.tag.id}`;
        }
        else if (props.feed) {
            let feedobj: AnnouncementFeed | null = AnnouncementFeeds.filter(e => e.id === props.feed)[0];
            if (feedobj) {
                param = feedobj.filters;
            }
            else if (props.feed === "my" && session.user.organizations) {
                if (session.user.organizations.length == 0) {
                    setAnnouncements([]);
                    setOffset(-1);
                    return;
                }
                // kinda wack here but if there isnt anything in session.user.organizations the feed should display no anns at all
                // if there is this code works :)
                param = '&organization=' + session.user.organizations.join('&organization=');
            }
        }
        const fetchURL = `${Routes.OBJECT}/announcement?limit=${ANN_FETCHLIMIT}&offset=${Math.max(offset, 0)}${param}`;
        session
            .getAPI(fetchURL, !!session.user.id) // !! is explicit cast from truthy to boolean, use credentials if user is logged in
            .then((res) => {
                setAnnouncements((prevAnns) => {
                    if (append) {
                        return prevAnns.concat(res.data.results);
                    }
                    else {
                        return res.data.results;
                    }
                });
                if (res.count - offset > ANN_FETCHLIMIT) { // there are more anns!
                    setOffset(prevOffset => prevOffset + ANN_FETCHLIMIT);
                }
                else {
                    setOffset(-1);
                }
            })
            .catch((err) => {
                session.refreshAuth();
            });
    }

    const listInnerRef = useRef();
    function trackScroll() {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log('REACHED BOTTOM');
                // reached bottom!
                // https://stackoverflow.com/a/64130642
                if (offset != -1) { // not -1 means there are more anns to fetch
                    fetchAnns(true);
                }
            }
        }
    }

    React.useEffect(() => {
        // TODO: fix race condition when there is a double update (both tag and feed change simultaneously)
        // honestly just switch to searchparams from react-router :clown:
        fetchAnns(false);
    }, [props.tag, props.feed]);

    return <div id="annlist" onScroll={() => trackScroll()}>
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
