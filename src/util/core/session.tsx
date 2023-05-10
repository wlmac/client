import * as React from 'react';
import jwt_decode from "jwt-decode";
import { default as axios } from 'axios';
import Routes from './misc/routes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getToken, setToken, getRefresh, setRefresh, loggedIn } from "./AuthService";
import Organization from './interfaces/organization';
import Tag from './interfaces/tag';
import { getPaginatedAPI } from '../query/apiQuerying';

export interface User {
    bio: string,
    first_name: string,
    last_name: string,
    is_staff: boolean,
    graduating_year: number,
    id: number,
    organizations: Array<number>,
    tags_following: Array<number>,
    timezone: string,
    username: string,
    email_hash: string,
    gravatar_url: string,
    registertime: number
}

export interface Session {
    user: User,
    allUsers: Array<User>,
    allOrgs: Array<Organization>,
    setUser: (user: User) => void,
    updateToken: (token: string) => void,
    getAPI: (url: string, auth?: boolean) => Promise<any>,
    postAPI: (url: string, data: any) => Promise<any>,
    putAPI: (url: string, data: any) => Promise<any>,
    patchAPI: (url: string, data: any) => Promise<any>,
    refreshAuth: () => void,
    logout: () => void
}

export const SessionContext = React.createContext<Session>({
    user: {} as User,
    allUsers: [],
    allOrgs: [],
    setUser: (user: User) => { },
    updateToken: (token: string) => { },
    getAPI: (url: string, auth?: boolean) => { return {} as Promise<any> },
    postAPI: (url: string, data: any) => { return {} as Promise<any> },
    putAPI: (url: string, data: any) => { return {} as Promise<any> },
    patchAPI: (url: string, data: any) => { return {} as Promise<any> },
    refreshAuth: () => { },
    logout: () => { }
});

export const SessionProvider = (props: { children: React.ReactNode }) => {
    let [user, updateUser] = React.useState({} as User);
    const [allUsers, setAllUsers] = React.useState([] as Array<User>);
    const [allOrgs, setAllOrgs] = React.useState([] as Array<Organization>);
    const nav: NavigateFunction = useNavigate();

    const setUser = (newUser: User): void => {
        user = newUser;
        updateUser(newUser);
    }

    const refreshUser = (): void => {
        if (loggedIn()) {
            getAPI(`${Routes.USER}/${user.id}`).then((res) => {
                setUser({
                    ...user,
                    ...res.data
                });
            }).catch((err) => {
                refreshAuth();
            });
        }
    }

    React.useEffect((): void => {
        if (loggedIn()) {
            updateToken(getToken());
            refreshUser();
        }

        getPaginatedAPI(getAPI, `${Routes.OBJECT}/user`).then((res) => {
            setAllUsers(res)
        }, (failMessage) => {
            console.error(failMessage);
        })

        getPaginatedAPI(getAPI, `${Routes.OBJECT}/organization`).then((res) => {
            setAllOrgs(res)
        }, (failMessage) => {
            console.error(failMessage);
        })
    }, []);

    const updateToken = (token: string): void => {
        setToken(token);
        if (token !== "") {
            let decoded: any = jwt_decode(token);

            setUser({
                ...user,
                id: decoded.user_id,
                registertime: decoded.iat
            });

            refreshUser();
        }
        else {
            setUser({} as User);
        }
    }

    function getAPI(url: string, auth?: boolean): Promise<any> {
        if (auth && !loggedIn()) {
            nav("/accounts/login");
        }
        const token = getToken();
        return axios.get(url, auth ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {});
    }

    const postAPI = (url: string, data: any): Promise<any> => {
        if (!loggedIn()) {
            nav("/accounts/login");
        }
        const token = getToken();
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const putAPI = (url: string, data: any): Promise<any> => {
        if (!loggedIn()) {
            nav("/accounts/login");
        }
        const token = getToken();
        return axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const patchAPI = (url: string, data: any): Promise<any> => {
        const token = getToken();
        return axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    const refreshAuth = (): void => {
        if (!loggedIn()) return;

        axios.post(Routes.AUTH.REFRESH, {
            refresh: getRefresh()
        }, {}).then((res) => {
            updateToken(res.data.access);
            setRefresh(res.data.refresh);
        }).catch((err) => {
            console.log("Refresh expired. Logging out.");
            logout();
        });
    }

    const logout = (): void => {
        if (!loggedIn()) return;

        setUser({} as User);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        nav("/accounts/login");
    }

    return (
        <SessionContext.Provider value={{ user: user, allUsers: allUsers, allOrgs: allOrgs, setUser: setUser, updateToken: updateToken, getAPI: getAPI, postAPI: postAPI, putAPI: putAPI, patchAPI: patchAPI, refreshAuth: refreshAuth, logout: logout }}>
            {props.children}
        </SessionContext.Provider>
    )
}
