import * as React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { loggedIn } from "../../../util/core/AuthService";
import Announcement from "../../../util/core/interfaces/announcement";
import Organization from "../../../util/core/interfaces/organization";
import { dateFormat } from "../../../util/core/misc/date";
import Routes from "../../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../../util/core/session";
import { AnnouncementFeed } from "../../../util/models";
import Markdown from "../../markdown";
import { AnnouncementFeeds } from "../feeds";

export const AnnouncementDetail = (): JSX.Element => {
    const { id } = useParams();
    const [announcement, setAnnouncement] = React.useState({ "body": "" } as Announcement);
    const session: Session = React.useContext(SessionContext);
    const nav: NavigateFunction = useNavigate();

    const [openCreator, setOpenCreator] = React.useState(true); // Modal

    React.useEffect(() => {
        console.log(loggedIn());
        session.getAPI(`${Routes.OBJECT}/announcement/retrieve/${id}`, loggedIn()).then((res) => {
            setAnnouncement(res.data);
        }).catch((err) => {
            console.log(err);
            session.refreshAuth();
        });
    }, []);

    const header = (currentFeed: string | null): Array<JSX.Element> => {
        return AnnouncementFeeds.map((feed: AnnouncementFeed): JSX.Element => {
            const headerClass: string = feed.id === currentFeed ? "header header-active" : "header";
            return <li key={feed.id} className={headerClass} onClick={(): void => nav(`/announcements?feed=${feed.id}`)}>{feed.text}</li>
        });
    }

    const AnnouncementPrompt = (props: {}): JSX.Element => {
        /* idk stuff to do stuff*/

        return (
            <div className="prompt">
                <div className="prompt-text">
                    <p id="approvaltop">The following announcement is awaiting your approval.</p>
                    <h5 id="approvalbot">Approve Announcement?</h5>
                </div>
                <div className="prompt-buttons">
                    <a className="checkmark" onClick={(ev: React.MouseEvent) => {
                        session.putAPI(`${Routes.OBJECT}/announcement/single/${id}`, {
                            ...announcement,
                            status: "a" // approved
                        }).then((res) => {
                            console.log("Success!");
                        }).catch((err) => {

                        });
                    }}><div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}><i className="material-icons">check</i></div></a>

                    <a className="reject" onClick={(ev: React.MouseEvent) => {
                        M.Modal.getInstance(document.getElementById("reject-popup")!).open();
                    }}><div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}><i className="material-icons" style={{ color: "red" }}>clear</i></div></a>
                </div>

            </div>
        );
    }

    // const RejectModal = (props: { openCreator: boolean, setOpenCreator: React.Dispatch<any> }): JSX.Element => {
    //     const openCreator: boolean = props.openCreator, setOpenCreator: React.Dispatch<any> = props.setOpenCreator;

    //     return (

    //     );

    // }

    const [rejectionReason, setRejectionReason] = React.useState("");

    let organization: Organization = session.allOrgs.find((organization: Organization) => organization.id === announcement.organization)!;
    let author: User = session.allUsers.find((user: User) => user.id === announcement.author)!;

    return organization && author ? (
        <>
            <link rel="stylesheet" href="/static/css/announcement-detail.css" />
            <div className="container">
                <AnnouncementPrompt />

                {/* Reject modal */}
                <div id="reject-popup" className="modal reject-modal">
                    <div className="modal-top modal-header">
                        <h5 className="header-announcement">Add Announcement</h5>
                    </div>
                    <div className="modal-content">
                        <div className="form reason">
                            <h6 className="form-label">Reason for rejection:</h6>
                            <input type="text" onChange={(ev) => setRejectionReason(ev.target.value)}></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-red btn-flat">Cancel</a>
                        <a className="waves-effect waves-light btn" onClick={(ev: React.MouseEvent) => {
                            session.putAPI(`${Routes.OBJECT}/announcement/single/${id}`, {
                                ...announcement,
                                status: "r",
                                rejection_reason: rejectionReason
                            }).then((res) => {
                                console.log("Success!");
                                M.Modal.getInstance(document.getElementById("reject-popup")!).close();
                            }).catch((err) => {

                            });
                        }}>Submit!</a>
                    </div>
                </div>

                <div className="headers">
                    <ul>
                        {header("")}
                    </ul>
                </div>
                <div className="card-container">
                    <div className="admin">
                        <a className="link" href={`/admin/core/announcement/${id}/change/`}>Edit</a>
                    </div>
                    <div className="tag-section">
                        <p className="tag" style={{ backgroundColor: "#f9ccff" }}>cultural &amp; community</p>
                        <p className="tag" style={{ backgroundColor: "#ffccd0" }}>school</p>
                    </div>
                    <h1 className="title">{announcement.title}</h1>
                    <div className="card-authors">
                        <div className="card-authors-image">
                            <Link to={`/club/${announcement.organization}`}><img className="circle" src={organization && organization.banner} /></Link>
                        </div>
                        <div className="card-authors-text">
                            <a href={`/club/${announcement.organization}`} className="link">{organization.name}</a>,
                            <a href={`/user/${announcement.author}`} className="link">{`${author.first_name} ${author.last_name}`}</a>
                            <br />
                            • {new Date(announcement.created_date).toLocaleTimeString(undefined, dateFormat)}
                        </div>
                    </div>

                    <hr />
                    <div className="card-body">
                        {!!announcement.body && <Markdown text={announcement.body} />}
                    </div>
                    <br />
                    <Link className="link" to="/announcements"><i className="zmdi zmdi-chevron-left"></i> Return to Announcements</Link>
                </div>
            </div>
        </>
    ) : <></>;
}

