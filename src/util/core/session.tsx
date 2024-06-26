import * as React from 'react';
import jwt_decode from "jwt-decode";
import { AxiosError, AxiosResponse, default as axios } from 'axios';
import Routes from './misc/routes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getToken, setToken, getRefresh, setRefresh, loggedIn } from "./AuthService";
import Organization from './interfaces/organization';
import Tag from './interfaces/tag';
import { AlertColor } from '@mui/material';
import { Notif } from './interfaces/notification';
import { RequestMethod } from './managers/session';
import { HttpException } from '../models';
import getCSRFToken from './misc/csrf';

const BATCH_CACHELIMIT = 100; // how many entities should be requested each iteration in a fetchAll operation

export interface User {
    bio: string,
    first_name: string,
    last_name: string,
    is_staff: boolean,
    graduating_year: number,
    id: number,
    organizations: Array<Organization>,
    organizations_leading: Array<Organization>,
    organizations_supervising: Array<Organization>,
    tags_following: Array<number>,
    timezone: string,
    username: string,
    email_hash: string,
    gravatar_url: string,
    registertime: number,
    is_teacher: boolean,
    is_superuser: boolean,
    is_deleted: boolean
}

export interface Session {
    user: User,
    setUser: (user: User) => void,
    refreshUser: () => void,
    updateToken: (token: string) => void,
    request: (method: RequestMethod, url: string, data?: any) => Promise<any>,
    refreshAuth: (callback?: () => void) => Promise<void>,
    logout: () => void,
    notify: (message: string, type: AlertColor) => void,
    notification: Notif,
    closeNotif: () => void,
}

export const SessionContext = React.createContext<Session>({
    user: {} as User,
    setUser: (user: User) => { },
    refreshUser: () => { },
    updateToken: (token: string) => { },
    request: () => { return {} as Promise<any> },
    refreshAuth: () => { return {} as Promise<void> },
    logout: () => { },
    notify: (message: string, type: AlertColor) => { },
    notification: {} as Notif,
    closeNotif: () => { }
});

export const SessionProvider = (props: { children: React.ReactNode }) => {
    let [user, updateUser] = React.useState({} as User);
    const nav: NavigateFunction = useNavigate();

    // Snackbar Notification
    const [notification, setNotification] = React.useState<Notif>({
        open: false,
        type: "info",
        message: ""
    });

    const notify = (message: string, type: AlertColor): void => {
        setNotification({ open: true, type: type, message: message });
    }

    const closeNotif = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    }

    const setUser = (newUser: User): void => {
        user = newUser;
        updateUser(newUser);
    }

    const refreshUser = (): void => {
        if (loggedIn()) {
            request('get', `${Routes.USER}/retrieve/${user.id}`).then((res) => {
                console.log(res);
                setUser({
                    ...user,
                    ...res.data
                });
            });
        }
    }

    React.useEffect(() => {
        if (loggedIn()) {
            updateToken(getToken());
            refreshUser();
        }
    }, []);

    // this function fetches every single entry of given path and caches it locally
    // a routine is run to download new content if the data is modified
    // do not supply any query params to the objtype
    const getAll = async (objtype: string) => {
        let item = localStorage.getItem(objtype);
        if (item) {
            try {
                let data = JSON.parse(item);
                let res = await request('head', `${Routes.OBJECT}/${objtype}?limit=${BATCH_CACHELIMIT}`);
                if (res.headers["last-modified"] && new Date(res.headers["last-modified"]).getTime() > data.modified) {
                    return await fetchAll(objtype);
                }
                else {
                    return data.data;
                }
            }
            catch {
                return await fetchAll(objtype);
            }
        }
        else {
            return await fetchAll(objtype);
        }
    }

    const fetchAll = async (objtype: string): Promise<any[]> => {
        try {
            let res = await request('get', `${Routes.OBJECT}/${objtype}?limit=${BATCH_CACHELIMIT}`);
            let arr = res.data.results;
            let i_count = 1; // backoff for spamming reqs
            while (true) {
                if (res.data.next) {
                    await new Promise(r => setTimeout(r, i_count * i_count * 100)); // timeout
                    // spent like a solid 5 minutes wondering about this function
                    res = await request('get', `${Routes.OBJECT}/${objtype}?limit=${BATCH_CACHELIMIT}&offset=${(i_count - 1) * BATCH_CACHELIMIT}`);
                    arr = [...arr, ...res.data.results];
                    i_count++;
                }
                else {
                    break;
                }
            }
            let newobj = JSON.stringify({ modified: Date.now(), data: arr });
            localStorage.setItem(objtype, newobj);
            return arr;
        }
        catch {
            return [];
        }
    }

    const updateToken = (token: string): void => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

    const request = async (method: RequestMethod, url: string, data?: any): Promise<any> => {
        if (loggedIn()) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        }
        else {
            axios.defaults.headers.common['Authorization'] = null;
        }

        if (method === 'post' || method === 'patch' || method === 'put') {
            axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();
        }
        else {
            axios.defaults.headers.common['X-CSRFToken'] = null;
        }

        try {
            const res = await axios({
                method: method,
                url: url,
                data: data
            });
            return res;
        }
        catch (err: any) {
            if (err.response.status === 401) {
                try {
                    const refresh = await refreshAuth();
                    //todo: use an exponential backoff so we don't end up DoSing the backend
                    return request(method, url, data); // Retry if refresh success
                }
                catch (err: any) {
                    logout();
                }
            }
            // else if (err.response.status === 404) {
            //     throw new HttpException("NotFoundException", "404 Not Found", 404);
            // }
        }
    }

    const refreshAuth = async (callback?: () => void): Promise<void> => {
        if (!loggedIn()) {
            notify("Please log back into your account.", "info");
            nav(`/account/login?next=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        const res = await axios.post(Routes.AUTH.REFRESH, {
            refresh: getRefresh()
        });
        updateToken(res.data.access);
        setRefresh(res.data.refresh);
    }

    const logout = (): void => {
        if (!loggedIn()) return;

        setUser({} as User);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        nav(`/account/login?next=${encodeURIComponent(window.location.pathname)}`);
    }

    return (
        <SessionContext.Provider value={{ user: user, setUser: setUser, refreshUser: refreshUser, updateToken: updateToken, request: request, refreshAuth: refreshAuth, logout: logout, notify: notify, notification: notification, closeNotif: closeNotif }}>
            {props.children}
        </SessionContext.Provider>
    )
}