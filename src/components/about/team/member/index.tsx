import * as React from "react";
import { Link } from "react-router-dom";
import { UserField } from "../../../../util/core/interfaces/post";

export const TeamMember = (props: { member: UserField, bio: string }): JSX.Element => {

    return "username" in props.member ? (
        <div className="member">
            <Link to={`/user/${props.member.username}`}>
                <div className="member-name">
                    <div className="member-image">
                        <img className="circle" src={props.member.gravatar_url} />
                    </div>
                    <div className="member-text">
                        {`${props.member.first_name} ${props.member.last_name}`}
                    </div>
                </div>
            </Link>

            <hr />
            <div className="member-bio">
                {props.bio}
            </div>
        </div>
    ) : <></>;
}