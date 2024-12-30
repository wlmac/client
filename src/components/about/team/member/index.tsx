import * as React from "react";
import { Link } from "react-router-dom";
import { Session, SessionContext, User, Alumni } from "../../../../util/core/session";
import config from "../../../../../config";
import Routes from "../../../../util/core/misc/routes";

export const TeamMember = (props: { memberID: number }): JSX.Element => {
    const session: Session = React.useContext(SessionContext);
    const [member, setMember] = React.useState<User | Alumni>({} as User | Alumni);
    const [isAlumni, setIsAlumni] = React.useState(false);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const schoolYear = currentMonth >= 8 ? currentYear + 1 : currentYear;

    React.useEffect(() => {
        session
            .request("get", `${Routes.USER}/retrieve/${props.memberID}`)
            .then((res) => {
                const userData = res.data;
                if (userData.graduating_year < schoolYear) {
                    Promise.all([
                        session.request("get", `${Routes.ALUMNI}?year=2021-2022`),
                        session.request("get", `${Routes.ALUMNI}?year=2022-2023`),
                    ]).then(([res1, res2]) => {
                        const allAlumni = [...res1.data, ...res2.data];
                        const alumniData = allAlumni.find(
                            (item: { user: Alumni }) => item.user.id === props.memberID
                        );
                        if (alumniData) {
                            setMember({
                                ...alumniData.user,
                                positions: alumniData.positions || [],
                            });
                            setIsAlumni(true);
                        }
                    });
                } else {
                    setMember(userData);
                }
            });
    }, [props.memberID]);

    return "username" in member ? (
        <div className="member">
            <Link to={`/user/${member.username}`}>
                <div className="member-name">
                    <div className="member-image">
                        <img className="circle" src={member.gravatar_url} />
                    </div>
                    <div className="member-text">
                        {`${member.first_name} ${member.last_name}`}
                        {isAlumni &&
                            (member as Alumni).positions?.map((position, index) => (
                                <span key={index} className="alumni-tags">
                                    {position}
                                </span>
                            ))}
                    </div>
                </div>
            </Link>

            <hr />
            <div className="member-bio">
                {
                    // @ts-expect-error
                    config.METROPOLIS_STAFF_BIO[props.memberID]}
            </div>
        </div>
    ) : <></>;
}