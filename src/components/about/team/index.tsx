import * as React from "react";
import { Link } from "react-router-dom";
import { TeamMember } from "./member";
import { Session, SessionContext, User } from "../../../util/core/session";
import Routes from "../../../util/core/misc/routes";
import { BranchList } from "./branch";
import config from "../../../../config";

export const ContentTeam = (): JSX.Element => {
    const session: Session = React.useContext(SessionContext);

    // JUST TEMPORARY, WILL FIX ONCE READY
    const [allUsers, setAllUsers] = React.useState<Array<User>>([]);

    React.useEffect(() => {
        // JUST TEMPORARY, WILL FIX ONCE READY
        session.getAPI(`${Routes.USER}?limit=99999`).then((res) => {
            setAllUsers(res.data.results);
        }).catch(() => {

        });
    }, []);

    const memberCount = (): number => {
        let sum = 0;
        for (const branchName in config.METROPOLIS_STAFFS) {
            // @ts-expect-error
            sum += config.METROPOLIS_STAFFS[branchName].length;
        }
        return sum;
    }

    let branches: Array<JSX.Element> = [];
    for (const branchName in config.METROPOLIS_STAFFS) {
        branches.push(<BranchList name={branchName} allUsers={allUsers} />);
    }

    return (
        <div className="content" id="content-team">
            <h1 className="title">Our Team</h1>
            <hr />
            <p className="text">
                A diverse group of {memberCount()} developers, artists, and creators worked in tandem to build this site.
            </p>
            <h1 className="title">Members</h1>
            <hr />

            {branches}
        </div>
    )
}