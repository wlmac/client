import * as React from "react";
import { TeamMember } from "../member";
import { User } from "../../../../util/core/session";
import config from "../../../../../config";

export const BranchList = (props: { name: string, allUsers: Array<User> }): JSX.Element => {
    // @ts-expect-error
    let branchStaffList: Array<number> = config.METROPOLIS_STAFFS[props.name];

    return (
        <div className="member-list">
            <h2 className="subtitle">{props.name}</h2>

            {
                branchStaffList.map((memberID: number): JSX.Element => {
                    return <TeamMember memberID={memberID} key={memberID} allUsers={props.allUsers} />
                })
            }
        </div>
    );
}