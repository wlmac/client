import * as React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { loggedIn } from "../../../../util/core/AuthService";
import Organization from "../../../../util/core/interfaces/organization";
import Tag from "../../../../util/core/interfaces/tag";
import { APIResponse } from "../../../../util/core/managers/session";
import Routes from "../../../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../../../util/core/session";
import { TagElement } from "../../../../util/core/tags";

export const EditClubDetails = (): JSX.Element => {
    const { id } = useParams(); 
    const session: Session = React.useContext(SessionContext); 
    const [club, setClub] = React.useState({} as Organization);
    const [currentBio, setCurrentBio] = React.useState("");

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/organization/retrieve/${id}`;
        session.getAPI(fetchURL, false).then((res) => {
            const current_club: Organization = res.data as Organization;
            setClub(current_club);
        })

        setCurrentBio(club.bio);
    }, []);

    console.log(`${club.name}'s Bio: ${club.bio}`);

    const handleSubmit = () => {
        //come on... do smth
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
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="edit-club-bio-textarea">Bio:</label>
                                <div className="row edit-club-bio">
                                    <textarea id="edit-club-bio-textarea" defaultValue={club.bio} onChange={handleBioChange}></textarea>
                                </div>
                            </div>
                            
                            <div className="field">
                                <div>
                                    <button type="submit" className="btn">Submit</button>
                                    <a href={`/club/${club.id}`} className="btn">Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}