import * as React from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { loggedIn } from "../../../util/core/AuthService";
import Organization from "../../../util/core/interfaces/organization";
import Tag from "../../../util/core/interfaces/tag";
import { APIResponse } from "../../../util/core/managers/session";
import { get_gravatar_uri } from "../../../util/core/misc/gravatar";
import Routes from "../../../util/core/misc/routes";
import { Session, SessionContext, User } from "../../../util/core/session";
import { TagElement } from "../../../util/core/tags";

export const ClubDetails = (): JSX.Element => {
    const { slug } = useParams();

    const nav: NavigateFunction = useNavigate();
    const session: Session = React.useContext(SessionContext);
    const [club, setClub] = React.useState({ name: "Loading..." } as Organization);
    const [tags, setTags] = React.useState([] as Array<Tag>);
    const [execs, setExecs] = React.useState([] as Array<User>);
    const [members, setMembers] = React.useState([] as Array<User>);

    React.useEffect((): void => {
        document.title = `${club.name} | Metropolis`;
    }, [club]);

    const goBack = (): void => {
        window.history.back();
    }

    React.useEffect(() => {
        const fetchURL = `${Routes.OBJECT}/organization/retrieve/${slug}?lookup=slug`;
        session.request('get', fetchURL).then((res) => {
            const current_club: Organization = res.data as Organization;
            setClub(current_club);

            // Tags
            session.request('get', `${Routes.OBJECT}/tag`).then((res) => {
                const tags_data: Tag[] = res.data.results;
                const current_tags: Tag[] = [];
                for (let i = 0; i < current_club.tags.length; i++) {
                    for (let j = 0; j < tags_data.length; j++) {
                        if (current_club.tags[i] === (tags_data[j] as Tag).id) {
                            current_tags.push(tags_data[j]);
                            break;
                        }
                    }
                }
                setTags(current_tags);
            }).catch(() => {
                session.refreshAuth();
            });

            // Execs and members
            session.request('get', `${Routes.OBJECT}/user?limit=99999999`).then((res) => {
                const users_data: User[] = res.data.results;
                setExecs(current_club.execs.map((execId: number): User => {
                    for (let i = 0; i < users_data.length; i++) {
                        if (users_data[i].id === execId) return users_data[i];
                    }
                    return null!;
                }));
                setMembers(current_club.members.map((execId: number): User => {
                    for (let i = 0; i < users_data.length; i++) {
                        if (users_data[i].id === execId) return users_data[i];
                    }
                    return null!;
                }));
            }).catch(() => {
                session.refreshAuth();
            });
        }).catch((err) => {
            session.refreshAuth();
        });
    }, []);

    const ClubLink = (props: { href: string }): JSX.Element => {
        return (
            <li><i className="zmdi zmdi-link zmdi-hc-lg" aria-hidden="true"></i><a href={props.href} target="_blank" style={{ wordBreak: "break-word" }}>{props.href}</a></li>
        )
    }

    // const UserElement = (props: { userID: number }): JSX.Element => {
    //     const [user, setUser] = React.useState({} as User);
    //     React.useEffect(() => {
    //         session.request('get', `${Routes.OBJECT}/user/retrieve/${props.userID}`, false).then((res: { data: any }) => {
    //             setUser(res.data as User);
    //             console.log("Fetched");
    //         }).catch(() => {
    //             session.refreshAuth();
    //         });
    //     }, []);
    //     return (
    //         <Link to={`/user/${user.id}`} key={user.id}>
    //             <div className="member">
    //                 <div className="member-image">
    //                     <img className="circle" src="/img/profile_picture" alt={`${user.username}'s profile picture`} />
    //                 </div>
    //                 <div className="member-text">
    //                     {`${user.first_name} ${user.last_name}`}
    //                 </div>
    //             </div>
    //         </Link>
    //     );
    // }

    return (
        <>
            <link rel="stylesheet" href="/resources/static/css/detail.css" />

            <div className="club">
                <div className="row">
                    <img className="club-banner responsive-img col s12" src={club.banner} alt="banner of organization" />
                </div>
                <div className="container">
                    <div className="club-detail">
                        <div className="row club-header">
                            <div className="col m3 s12">
                                <div className="club-logo">
                                    <img className="circle" src={club.icon} alt="icon of organization" />
                                </div>
                            </div>
                            <div className="col m5 s12">
                                <h2 className="club-name">{club.name}</h2>
                                <div className="tag-section">
                                    {
                                        tags.map((tag: Tag) => {
                                            return <TagElement tag={tag} />
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col m4 s12">

                            </div>
                        </div>
                        <div className="row club-info">
                            <div className="col m8">
                                <div className="description">
                                    {club.bio}
                                    <br /><br />
                                    {
                                        (loggedIn() && club.owner === session.user.id) ? <Link to={`/club/edit/${club.slug}`}>Edit club details</Link> : <></>
                                    }
                                </div>
                            </div>
                            <div className="col m4">

                                <ul className="link-section" style={{ display: "inline" }}>
                                    {
                                        ("links" in club) ?
                                            club.links.map((url: string) => {
                                                return <ClubLink href={url} />
                                            })
                                            :
                                            <></>
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12">
                                <section id="executives">
                                    <h4>
                                        Executives
                                    </h4>
                                    <hr />
                                    <div className="members-list">
                                        {
                                            execs.map((exec: User): JSX.Element => {
                                                if (exec === null) return <></>;
                                                return (
                                                    <Link to={`/user/${exec.username}`} key={exec.id}>
                                                        <div className="member">
                                                            <div className="member-image">
                                                                <img className="circle" src={exec.gravatar_url} alt={`${exec.username}'s profile picture`} />
                                                            </div>
                                                            <div className="member-text">
                                                                {`${exec.first_name} ${exec.last_name}`}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        }
                                    </div>
                                </section>
                                <section id="members">
                                    <h4>
                                        Members
                                    </h4>
                                    <hr />

                                    <div className="members-list">
                                        {
                                            members.map((member: User): JSX.Element => {
                                                if (member === null) return <></>;
                                                return (
                                                    <Link to={`/user/${member.username}`} key={member.id}>
                                                        <div className="member">
                                                            <div className="member-image">
                                                                <img className="circle" src={member.gravatar_url} alt={`${member.username}'s profile picture`} />
                                                            </div>
                                                            <div className="member-text">
                                                                {`${member.first_name} ${member.last_name}`}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        }
                                        {/* {
                                            ("members" in club) ?
                                                club.members.map((memberID: number): React.ReactNode => {
                                                    return <UserElement userID={memberID} />
                                                }) : <></>
                                        } */}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}