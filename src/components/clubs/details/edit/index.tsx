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

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/organization/retrieve/${id}`;
        session.getAPI(fetchURL, false).then((res) => {
            const current_club: Organization = res.data as Organization;
            setClub(current_club);
        })
    }, []);

    console.log(`${club.name}'s description: ${club.bio}`);

    return (
        <>
            <link rel="stylesheet" href="/static/css/edit-club.css"></link>
            <div className="edit-club">
                <div className="row">
                    <img className="club-banner responsive-img col s12" src={club.banner} alt="banner of organization" />
                </div>
                <div className="container">
                    <div className="row page-title">
                        <h1><strong>Edit club details for {club.name}</strong></h1>
                    </div>
                    <div className="row edit-club-bio m3">
                        <textarea>
                            {club.bio}
                        </textarea>
                    </div>
                </div>
            </div>
        </>
    );
}