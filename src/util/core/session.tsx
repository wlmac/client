import * as React from 'react';
import jwt_decode from "jwt-decode";
import { AxiosResponse, default as axios } from 'axios';
import Routes from './misc/routes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getToken, setToken, getRefresh, setRefresh, loggedIn } from "./AuthService";
import Organization from './interfaces/organization';
import Tag from './interfaces/tag';
import { AlertColor } from '@mui/material';
import { Notif } from './interfaces/notification';

const BATCH_CACHELIMIT = 100; // how many entities should be requested each iteration in a fetchAll operation

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
    allTags: Array<Tag>,
    setUser: (user: User) => void,
    updateToken: (token: string) => void,
    getAPI: (url: string, auth?: boolean) => Promise<any>,
    postAPI: (url: string, data: any) => Promise<any>,
    putAPI: (url: string, data: any) => Promise<any>,
    patchAPI: (url: string, data: any) => Promise<any>,
    refreshAuth: () => void,
    logout: () => void,
    notify: (message: string, type: AlertColor) => void,
    notification: Notif,
    closeNotif: () => void,
}

export const SessionContext = React.createContext<Session>({
    user: {} as User,
    allUsers: [],
    allOrgs: [],
    allTags: [],
    setUser: (user: User) => { },
    updateToken: (token: string) => { },
    getAPI: (url: string, auth?: boolean) => { return {} as Promise<any> },
    postAPI: (url: string, data: any) => { return {} as Promise<any> },
    putAPI: (url: string, data: any) => { return {} as Promise<any> },
    patchAPI: (url: string, data: any) => { return {} as Promise<any> },
    refreshAuth: () => { },
    logout: () => { },
    notify: (message: string, type: AlertColor) => { },
    notification: {} as Notif,
    closeNotif: () => { }
});

export const SessionProvider = (props: { children: React.ReactNode }) => {
    let [user, updateUser] = React.useState({} as User);
    const [allUsers, setAllUsers] = React.useState([] as Array<User>);
    const [allOrgs, setAllOrgs] = React.useState([] as Array<Organization>);
    const [allTags, setAllTags] = React.useState([] as Array<Tag>);
    const nav: NavigateFunction = useNavigate();

    // Snackbar Notification
    const [notification, setNotification] = React.useState<Notif>({
        open: false,
        type: "" as AlertColor,
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
            getAPI(`${Routes.USER}/retrieve/${user.id}`).then((res) => {
                setUser({
                    ...user,
                    ...res.data
                });
            }).catch((err) => {
                refreshAuth();
            });
        }
    }

    React.useEffect(() => {
        if (loggedIn()) {
            updateToken(getToken());
            refreshUser();
        }

        cacheRoutine();

        const interval = setInterval(() => {
            cacheRoutine();
        }, 5 * 60 * 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const cacheRoutine = async () => {
        getAll(`user`).then((data) => {
            setAllUsers(data);
        }).catch((err) => { });

        getAll(`organization`).then((data) => {
            setAllOrgs(data);
        }).catch((err) => { });

        getAll(`tag`).then((data) => {
            setAllTags(data);
        }).catch((err) => { });
    }

    // this function fetches every single entry of given path and caches it locally
    // a routine is run to download new content if the data is modified
    // do not supply any query params to the objtype
    const getAll = async (objtype: string) => {
        let item = localStorage.getItem(objtype);
        if (item) {
            try {
                let data = JSON.parse(item);
                let res = await headAPI(`${Routes.OBJECT}/${objtype}?limit=${BATCH_CACHELIMIT}`);
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
            let res = await getAPI(`${Routes.OBJECT}/${objtype}?limit=${BATCH_CACHELIMIT}`);
            let arr = res.data.results;
            let i_count = 1; // backoff for spamming reqs
            while (true) {
                if (res.data.next) {
                    await new Promise(r => setTimeout(r, i_count * i_count * 100)); // timeout
                    // spent like a solid 5 minutes wondering about this function
                    res = await getAPI(res.data.next);
                    arr.concat(res.data.results);
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

    function getAPI(url: string, auth?: boolean): Promise<AxiosResponse> {
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

    const postAPI = (url: string, data: any): Promise<AxiosResponse> => {
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

    const putAPI = (url: string, data: any): Promise<AxiosResponse> => {
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

    const patchAPI = (url: string, data: any): Promise<AxiosResponse> => {
        const token = getToken();
        return axios.patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    function headAPI(url: string): Promise<AxiosResponse> {
        return axios.head(url);
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
        <SessionContext.Provider value={{ user: user, allUsers: allUsers, allOrgs: allOrgs, allTags: allTags, setUser: setUser, updateToken: updateToken, getAPI: getAPI, postAPI: postAPI, putAPI: putAPI, patchAPI: patchAPI, refreshAuth: refreshAuth, logout: logout, notify: notify, notification: notification, closeNotif: closeNotif }}>
            {props.children}
        </SessionContext.Provider>
    )
}

