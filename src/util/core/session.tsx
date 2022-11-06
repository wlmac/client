/**
 * React SessionProvider written by Patrick Lin (ApocalypseCalculator)
 */

import * as React from 'react';
import jwt_decode from "jwt-decode";
import { default as axios } from 'axios';
import Routes from './misc/routes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getToken, setToken, getRefresh, setRefresh, loggedIn } from "./AuthService";

export interface User {
    username: string,
    userid: string,
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
        username: "",
        userid: "",
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
        loggedin: false,
        username: "",
        userid: "",
        registertime: 0
    });
    const nav: NavigateFunction = useNavigate();

    const updateToken = (token: string): void => {
        setToken(token);
        if (token !== "") {
            let decoded: any = jwt_decode(token);
            setUser({
                loggedin: true,
                username: decoded.username,
                userid: decoded.userid,
                registertime: decoded.registertime
            });
            console.log("Is logged in");
        }
        else {
            setUser({
                loggedin: false,
                username: "",
                userid: "",
                registertime: 0
            });
            console.log("Is NOT logged in");
        }
    }

    function getAPI(url: string): Promise<any> {
        const token = getToken();
        console.log(`Using token ${token}`);
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    function postAPI(url: string, data: any): Promise<any> {
        const token = getToken();
        console.log(`Using token ${token}`);
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    function refreshAuth(): void {
        if (!loggedIn()) {
            console.log("Not logged in");
            return;
        }

        console.log("Refreshing auth...");
        axios.post(Routes.AUTH.REFRESH, {
            refresh: getRefresh()
        }, {}).then((res) => {
            console.log("Refresh success with token:", res.data.token);
            updateToken(res.data.token);
            setRefresh(res.data.refresh);
        }).catch((err) => {
            console.log("Refresh expired. Logging out.");
            logout();
        });
    }

    function logout(): void {
        if (!loggedIn()) return;

        setUser({
            loggedin: false,
            username: "",
            userid: "",
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