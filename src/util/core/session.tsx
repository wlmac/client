/**
 * React SessionProvider written by Patrick Lin (ApocalypseCalculator)
 */

import * as React from 'react';
import jwt_decode from "jwt-decode";
import SessionManager from './managers/session';
import User from './interfaces/user';

// export interface User {
//     loggedin: boolean,
//     username: string,
//     userid: string,
//     registertime: number
// }

export interface Session {
    user: User,
    sessionManager: SessionManager,
    setUser: React.Dispatch<any>,
    setSessionManager: React.Dispatch<any>,
}

export const SessionContext = React.createContext<Session>({
    user: {
        id: 0,
        slug: "",
        name: ["", ""],
        bio: "",
        timezone: "",
        graduatingYear: 0,
        organizations: [],
        following: [],
    },
    sessionManager: new SessionManager(),
    setUser: () => { },
    setSessionManager: () => { },
});

export const SessionProvider = (props: { children: JSX.Element }) => {
    const [sessionManager, setSessionManager] = React.useState(new SessionManager());
    const [user, setUser] = React.useState({
        id: 0,
        slug: "",
        name: ["", ""],
        bio: "",
        timezone: "",
        graduatingYear: 0,
        organizations: [],
        following: [],
    } as User);
    // React.useEffect((): void => {
    //     const storagetoken = localStorage.getItem("token");
    //     if (storagetoken) {
    //         updateToken(storagetoken);
    //     }
    // }, []);
    const value: Session = { user, sessionManager, setUser, setSessionManager };
    return (
        <SessionContext.Provider value={value}>
            {props.children}
        </SessionContext.Provider>
    );
}