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
    const [club, setClub] = React.useState({} as Organization);

    return (
        <>
            <link rel="stylesheet" href="/static/css/edit-club.css"></link>
            <div className="edit-club">
                <div className="row">
                    <img className="club-banner responsive-img col s12" src={club.banner} alt="banner of organization" />
                </div>
                <p>magic..</p>
            </div>
        </>
    );
}