import * as React from 'react';
import jwt_decode from "jwt-decode";
import { default as axios } from 'axios';
import Routes from './misc/routes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getToken, setToken, getRefresh, setRefresh, loggedIn } from "./AuthService";

export interface User {
    bio: string,
    first_name: string,
    last_name: string,
    graduating_year: number,
    id: number,
    organizations: Array<number>,
    tags_following: Array<number>,
    timezone: string,
    username: string,
    registertime: number
}

export interface Session {
    user: User,
    updateToken: (token: string) => void,
    getAPI: (url: string) => Promise<any>,
    postAPI: (url: string, data: any) => Promise<any>,
    refreshAuth: () => void,
    logout: () => void
}

export const SessionContext = React.createContext<Session>({
    user: {
        bio: "",
        first_name: "",
        last_name: "",
        graduating_year: 0,
        id: 0,
        organizations: [],
        tags_following: [],
        timezone: "",
        username: "",
        registertime: 0
    },
    updateToken: (token: string) => { },
    getAPI: (url: string) => { return {} as Promise<any> },
    postAPI: (url: string, data: any) => { return {} as Promise<any> },
    refreshAuth: () => { },
    logout: () => { }
});

export const SessionProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState({
        bio: "",
        first_name: "",
        last_name: "",
        graduating_year: 0,
        id: 0,
        organizations: [],
        tags_following: [],
        timezone: "",
        username: "",
        registertime: 0
    });
    const nav: NavigateFunction = useNavigate();

    React.useEffect((): void => {
        if (loggedIn()) {
            updateToken(getToken());

            getAPI(`${Routes.USER}/${user.id}`).then((res) => {
                setUser({
                    ...user,
                    ...res.data
                });
            }).catch((err) => {
                refreshAuth();
            });
        }
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
        }
        else {
            setUser({
                bio: "",
                first_name: "",
                last_name: "",
                graduating_year: 0,
                id: 0,
                organizations: [],
                tags_following: [],
                timezone: "",
                username: "",
                registertime: 0
            });
        }
    }

    function getAPI(url: string): Promise<any> {
        const token = getToken();
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const postAPI = (url: string, data: any): Promise<any> => {
        const token = getToken();
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

        setUser({
            bio: "",
            first_name: "",
            last_name: "",
            graduating_year: 0,
            id: 0,
            organizations: [],
            tags_following: [],
            timezone: "",
            username: "",
            registertime: 0
        });
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        nav("/accounts/login");
    }

    return (
        <SessionContext.Provider value={{ user: user, updateToken: updateToken, getAPI: getAPI, postAPI: postAPI, refreshAuth: refreshAuth, logout: logout }}>
            {props.children}
        </SessionContext.Provider>
    )
}
