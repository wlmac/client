import * as React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { loggedIn } from "../../../../util/core/AuthService";
import { default as axios } from 'axios';
import Organization from "../../../../util/core/interfaces/organization";
import Tag from "../../../../util/core/interfaces/tag";
import { APIResponse } from "../../../../util/core/managers/session";
import { RouterLink } from "../../../app/navigation";
import Routes from "../../../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../../../util/core/session";
import { TagElement } from "../../../../util/core/tags";

export const EditClubDetails = (): JSX.Element => {
    const nav: NavigateFunction = useNavigate();
    const { slug } = useParams();
    const session: Session = React.useContext(SessionContext);
    const [club, setClub] = React.useState({} as Organization);
    const [error, setError] = React.useState("");

    //the club that changes happen to, and this will be sent after the "submit" goes through
    const [newClub, setNewClub] = React.useState({} as Organization);
    const [currentBio, setCurrentBio] = React.useState("");

    //when the page gets loaded, this gets called and all the react states get set to the GET APIs
    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/organization/retrieve/${slug}?lookup=slug`;
        session.getAPI(fetchURL, false).then((res) => {
            const current_club: Organization = res.data as Organization;
            setClub(current_club);
            setNewClub(current_club);
        })

        setCurrentBio(club.bio);
    }, []);

    // React.useEffect(() => {
    //     if (!loggedIn()) {
    //         session.notify("Please login to access this page", "info");
    //         nav(`/accounts/login?next=${encodeURIComponent(window.location.pathname)}`);
    //     }
    // });

    // console.log(`${club.name}'s Bio: ${club.bio}`);

    const handleSubmit = (event?: any) => {
        if (event) event.preventDefault();
        console.log("ogga");
        //come on... do smth
        const patchURL = `${Routes.OBJECT}/organization/single/${club.id}`;
        session.patchAPI(patchURL, newClub).then((res) => {
            session.notify(`Successfully changed ${club.name}'s details`, "success");
            nav(`/club/${club.id}`);
        }).catch((err) => {
            console.log(err.response.status);
            if (err.response.status === 401) {
                session.refreshAuth();
                handleSubmit();
                return;
            }
            // session.notify(`Failed to change ${club.name}'s details`, "error");
            session.notify(`An internal error occured. Please contact an admin to get it fixed.`, "error")
        });
    }

    const handleBioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCurrentBio(event.target.value);
        console.log(currentBio + " " + club.name);
    }

    return (
        <>
            <link rel="stylesheet" href="/static/css/edit-club.css"></link>
            <div className="edit-club">
                <div className="row">
                    <img className="club-banner responsive-img col s12" src={club.banner} alt="banner of organization" />
                </div>
                <div className="container">
                    <div className="white-bg box-center">
                        <div className="row page-title">
                            <h1><strong>Edit club details for {club.name}</strong></h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="edit-club-name-textarea">Name:</label>
                                <div className="row edit-club-name">
                                    <input type="text" id="edit-club-name-textarea" defaultValue={club.name} onChange={handleBioChange}></input>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="edit-club-status-dropdown">Club Status:</label>
                                <select id="edit-club-status-dropdown" className="browser-default">
                                    <option value="Open Membership">Open Membership</option>
                                    <option value="Accepting Applications">Accepting Applications</option>
                                    <option value="Closed Applications">Closed Applications</option>
                                </select>


                            </div>

                            <div className="field">
                                <label htmlFor="edit-club-bio-textarea">Bio:</label>
                                <div className="row edit-club-bio">
                                    <textarea id="edit-club-bio-textarea" defaultValue={club.bio} onChange={handleBioChange}></textarea>
                                </div>
                                {/*
                                club links
                                
                                profile picture and banner picture (somewhat hard)
                                */}
                            </div>

                            <div className="field">
                                <div>
                                    <button type="submit" className="btn">Submit</button>
                                    <Link to={`/club/${club.slug}`} className="btn">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}