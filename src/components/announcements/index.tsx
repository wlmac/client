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

const ANN_FETCHLIMIT = 10; // how many anns to fetch each api request

export const Announcements = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");

    const [openCreator, setOpenCreator] = React.useState(false);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            //console.log(editorRef.current.getContent());
        }
    };

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    const header = (currentFeed: string | null): Array<JSX.Element> => {
        return AnnouncementFeeds.map((feed: AnnouncementFeed): JSX.Element => {
            const headerClass: string =
                feed.id === currentFeed ? "header header-active" : "header";
            return (
                <li
                    key={feed.id}
                    className={headerClass}
                    onClick={(): void => nav(`/announcements?feed=${feed.id}`)}
                >
                    {feed.text}
                </li>
            );
        });
    };

    return (
        <>
            <link rel="stylesheet" href="static/css/announcement-list.css" />
            <AnnouncementCreator
                openCreator={openCreator}
                setOpenCreator={setOpenCreator}
            />

            <div className="container">
                <div className="headers header-row">
                    <ul>{header(feed)}</ul>
                    <a
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
                    </a>
                </div>
                <div className="card-container">
                    <div className="cards" id="cards-all">
                        {AnnouncementList()}
                    </div>
                </div>
            </div>
        </>
    );
};

const AnnouncementList = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);

    const [announcements, setAnnouncements] = React.useState([] as any[]);
    const [offset, setOffset] = React.useState(0);

    function fetchAnns() {
        const fetchURL = `${Routes.OBJECT}/announcement?limit=${ANN_FETCHLIMIT}&offset=${offset}`;
        session
            .getAPI(fetchURL, !!session.user.id) // !! is explicit cast from truthy to boolean, use credentials if user is logged in
            .then((res) => {
                setAnnouncements((prevAnns) => prevAnns.concat(res.data.results));
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
                // reached bottom!
                // https://stackoverflow.com/a/64130642
                if (offset != -1) { // not -1 means there are more anns to fetch
                    fetchAnns();
                }
            }
        }
    }

    React.useEffect(() => {
        fetchAnns();
    }, []);

    return <div id="annlist" onScroll={() => trackScroll()}>
        {
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
    const data: Announcement = props.announcement;
    const session: Session = React.useContext(SessionContext);
    let organization: Organization = session.allOrgs.find((organization: Organization) => organization.id === data.organization)!;
    let author: User = session.allUsers.find((user: User) => user.id === data.author)!;

    return organization && author ? (
        <div className="card">
            <div className="card-headers">
                <div className="tag-section">
                    {props.tags.map((tag: Tag): JSX.Element => {
                        return <TagElement key={tag.id} tag={tag} />;
                    })}
                </div>
                <h1 className="title">{data.title}</h1>
                <div className="card-authors">
                    <div className="card-authors-image">
                        <Link to={`/club/${data.organization}`}><img className="circle" src={author.gravatar_url} /></Link>
                    </div>
                    <div className="card-authors-text">
                        <Link to={`/club/${data.organization}`} className="link">{organization.name}</Link>,
                        <Link to={`/user/${data.author}`} className="link">{`${author.first_name} ${author.last_name}`}</Link>
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

const AnnouncementCreator = (props: {
    openCreator: boolean;
    setOpenCreator: React.Dispatch<any>;
}): JSX.Element => {
    const openCreator: boolean = props.openCreator,
        setOpenCreator: React.Dispatch<any> = props.setOpenCreator;
    // if (!openCreator) return <></>

    const [isPublic, setIsPublic] = React.useState(false);
    const session: Session = React.useContext(SessionContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AnnouncementInputs>();
    const [error, setError] = React.useState("");

    const [selected, setSelected] = React.useState<string[]>([]);
    const names = session.allOrgs.map((organization: Organization): string => {
        return organization.name;
    });

    const onCreate = (data: AnnouncementInputs): void => {
        // console.log("Submitted data:", data);
        session
            .postAPI(`${Routes.OBJECT}/announcement/new`, {
                ...data,
            })
            .then(() => {
                console.log("Announcement created successfully");
            })
            .catch((err) => {
                console.log("Error:", err);
                // session.refreshAuth();
            });
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
        const {
            target: { value },
        } = event;
        setSelected(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div id="announcement-creator" className="modal">
            <div className="modal-top modal-header">
                <h5 className="header-announcement">Add Announcement</h5>
            </div>
            <form
                className="signup"
                onSubmit={handleSubmit(onCreate)}
                style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
            >
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_title">Title:</label>
                        <input
                            {...register("title")}
                            type="text"
                            name="title"
                            required={true}
                            id="id_title"
                            style={{
                                backgroundImage:
                                    "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;",
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <>
                        <Editor
                            apiKey="your-api-key"
                            onInit={(evt, editor) => { }}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                    </>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_org">Organization:</label>
                        <br />
                        <select {...register("organization")} className="browser-default">
                            {
                                session.allOrgs.map((org: Organization) => {
                                    return <option key={org.id} value={org.id}>{org.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_show_after">Show After:</label>
                        <input
                            {...register("show_after")}
                            type="text"
                            name="show_after"
                            minLength={1}
                            required={true}
                            id="id_show_after"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_supervisor">Supervisor:</label>
                        <input
                            {...register("supervisor")}
                            type="text"
                            name="supervisor"
                            minLength={1}
                            required={true}
                            id="id_supervisor"
                        />
                    </div>
                </div>
                {error && (
                    <span className="form-error">
                        <div className="form-errors">
                            <i className="material-icons">warning</i>
                            <>{error}</>
                        </div>
                    </span>
                )}
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-red btn-flat">
                        Cancel
                    </a>
                    <button className="waves-effect waves-green btn" type="submit">
                        Create!
                    </button>
                </div>
            </form>
        </div>
    );

    // return (
    //     <div className="popup">
    //         <div className="modal-a">
    //             <div className="modal-top modal-header">
    //                 <h5 className="header-announcement">Add Announcement</h5>
    //                 <a className="waves-effect waves-light btn" onClick={(ev: React.MouseEvent) => {
    //                     ev.preventDefault();
    //                     setOpenCreator(false);
    //                 }}>Cancel</a>
    //             </div>
    //             <div className="modal-content">
    //                 <div className="form input-row">
    //                     <h6 className="form-label">Organization:</h6>
    //                     <input type="text" className="textbox"></input>
    //                 </div>
    //                 <div className="form input-row">
    //                     <h6 className="form-label">Title:</h6>
    //                     <input type="text"></input>
    //                 </div>
    //                 <div className="form input-row">
    //                     <h6 className="form-label">Body:</h6>
    //                     <input type="text"></input>
    //                 </div>
    //                 <div className="form input-row">
    //                     <h6 className="form-label">Tags:</h6>
    //                     <input type="text"></input>
    //                 </div>
    //                 <div className="form input-row">
    //                     <h6 className="form-label">Public:</h6>
    //                     <label>
    //                         <input type="checkbox" className="filled-in" onChange={(ev) => setIsPublic(ev.target.checked)} />
    //                         <span>Filled in</span>
    //                     </label>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};
