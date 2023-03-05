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
import {useForm} from "react-hook-form";

export const Announcements = (): JSX.Element => {
    const query: URLSearchParams = useQuery();
    const nav: NavigateFunction = useNavigate();
    const feed: string | null = query.get("feed");

    const [openCreator, setOpenCreator] = React.useState(false);

    React.useEffect((): void => {
        document.title = "Announcements | Metropolis";
    }, []);

    React.useEffect((): void => {
        if (!loggedIn()) {
            nav(`/accounts/login?next=/announcements`);
        }
    });

    const header = (currentFeed: string | null): Array<JSX.Element> => {
        return AnnouncementFeeds.map((feed: AnnouncementFeed): JSX.Element => {
            const headerClass: string = feed.id === currentFeed ? "header active" : "header";
            return <li key={feed.id} className={headerClass} onClick={(): void => nav(`/announcements?feed=${feed.id}`)}>{feed.text}</li>
        });
    }

    const openModal = () => {
        setOpenCreator(true);
    };

    return (
        <>
            <link rel="stylesheet" href="static/css/announcement-list.css" />
            <AnnouncementCreator openCreator={openCreator} setOpenCreator={setOpenCreator} />
            <div className="container">
                <div className="headers header-row">
                    <ul>
                        {header(feed)}
                    </ul>
                    <a className="btn-small waves-light red" href="#modal1" onClick={(ev) => {
                        ev.preventDefault();
                        M.Modal.getInstance(document.getElementById("announcement-creator")!).open();
                    }}><i className="material-icons">add</i></a>
                </div>
                <div className="card-container">
                    <div className="cards" id="cards-all">
                        {AnnouncementList()}
                    </div>
                </div>
            </div>
        </>
    );
}

const AnnouncementList = (): JSX.Element[] => {
    const session: Session = React.useContext(SessionContext);

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/announcement`;
        session.getAPI(fetchURL).then((res) => {
            setAnnouncements(res.data.results);
        }).catch((err) => {
            session.refreshAuth();
        });

        // Tags
        session.getAPI(`${Routes.OBJECT}/tag`).then((res) => {
            const tags = res.data.results;
            setTags(tags);
        }).catch(() => {
            session.refreshAuth();
        });
    }, []);

    const [announcements, setAnnouncements] = React.useState([]);
    const [tags, setTags] = React.useState([]);

    return announcements.map((announcement: Announcement): JSX.Element => {
        let current_tags: Tag[] = [];
        for (let i = 0; i < announcement.tags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                if (announcement.tags[i] == (tags[j] as Tag).id) {
                    current_tags.push(tags[j]);
                }
            }
        }
        return <AnnouncementElement key={announcement.id} announcement={announcement} tags={current_tags} />;
    });
}

const AnnouncementElement = (props: { announcement: Announcement, tags: Tag[] }): JSX.Element => {
    const data: Announcement = props.announcement;

    return (
        <div className="card">
            <div className="card-headers">
                <div className="tag-section">
                    {
                        props.tags.map((tag: Tag): JSX.Element => {
                            return <TagElement key={tag.id} tag={tag} />
                        })
                    }
                </div>
                <h1 className="title">{data.title}</h1>
                <div className="card-authors">
                    <div className="card-authors-image">
                        <Link to={`/club/${data.organization}`}><img className="circle" src={data.organization} /></Link>
                    </div>
                    <div className="card-authors-text">
                        <Link to={`/club/${data.organization}`} className="link">{data.organization}</Link>,
                        <Link to={`/user/${data.author}`} className="link">{data.author}</Link>
                        <br />
                        • {data.created_date}
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

const AnnouncementCreator = (props: { openCreator: boolean, setOpenCreator: React.Dispatch<any> }): JSX.Element => {
    const openCreator: boolean = props.openCreator, setOpenCreator: React.Dispatch<any> = props.setOpenCreator;
    // if (!openCreator) return <></>

    const [isPublic, setIsPublic] = React.useState(false);
    const session: Session = React.useContext(SessionContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<AnnouncementInputs>();
    const [error, setError] = React.useState("");
    const [clubs, setClubs] = React.useState<Array<Organization>>([]);
    const orgWatch: string = watch("organization")

    React.useEffect(() => {
        console.log("querying organizations");
        session.getAPI(`${Routes.OBJECT}/organization`).then((response) => setClubs(response.data.results));
    }, []);

    const onCreate = (data: AnnouncementInputs): void => {
        console.log("Submitted data:", data);
        session.postAPI(`${Routes.OBJECT}/announcement/new`, {
            ...data
        }).then(() => {
            console.log("Announcement created successfully");
        }).catch((err) => {
            console.log("Error:", err);
            // session.refreshAuth();
        });
    }

    const [orgSupervisors, setOrgSupervisors] = React.useState<Array<User>>([])
    React.useEffect(() => {
        const chosenOrg = clubs.find((org) => {return org.id === parseInt(orgWatch)})
        setOrgSupervisors([])
        if(chosenOrg != undefined){
            for(const id of chosenOrg.supervisors){
                session.getAPI(`user/{id}`).then((response) => setOrgSupervisors(orgSupervisors + response.data))
            }
        }
    }, [orgWatch])

    return (
        <div id="announcement-creator" className="modal">
            <div className="modal-top modal-header">
                <h5 className="header-announcement">Add Announcement</h5>
            </div>
            <form className="signup" onSubmit={handleSubmit(onCreate)} style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_title">Title:</label>
                        <input {...register("title")} type="text" name="title" required={true} id="id_title" style={{ backgroundImage: "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;" }} />
                    </div>
                </div><div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_body">Body:</label>
                        <input {...register("body")} type="text" name="body" minLength={1} required={true} id="id_body" />
                    </div>
                </div><div className="row">
                    <div className="col s12">
                        <label htmlFor="id_org">Organization:</label>
                        <select {...register("organization", {minLength: 1})} name="organization" required={true} id="id_org">
                            <option key="-1" value="">Select Club</option>
                            {clubs.map((org) => {return <option key={org.id} value={org.id}>{org.name}</option>})}
                        </select>
                    </div>
                </div><div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_show_after">Show After (yyyy-mm-ddThh-mm):</label>
                        <input {...register("show_after", {pattern: {
                                value: /\d\d\d\d-\d\d-\d\dT\d\d:\d\d/,
                                message: "(e.g. 2022-04-21T05:30)"
                            }})} type="text" name="show_after" minLength={1} required={true} id="id_show_after"/>
                    </div>
                </div><div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="id_supervisor">Supervisor:</label>
                        <select {...register("supervisor")} name="supervisor" required={true} id="id_supervisor">
                            <option key="1" value="1">Select Supervisor</option>
                            { orgSupervisors.map((user) => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)}
                        </select>
                    </div>
                </div>
                {error &&
                    <span className="form-error">
                        <div className="form-errors">
                            <i className="material-icons">warning</i>
                            <>{error}</>
                        </div>
                    </span>}
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-red btn-flat">Cancel</a>
                    <button className="waves-effect waves-green btn" type="submit">Create!</button>
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
}
