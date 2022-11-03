/**
 * React SessionProvider written by Patrick Lin (ApocalypseCalculator)
 */

import * as React from 'react';
import jwt_decode from "jwt-decode";
import { default as axios } from 'axios';
import Routes from './misc/routes';

export interface User {
    loggedin: boolean,
    username: string,
    userid: string,
    registertime: number
}

export interface Session {
    user: User,
    token: string,
    refresh: string,
    updateToken: (token: string) => void,
    getAPI: (url: string) => Promise<any>,
    postAPI: (url: string, data: any) => Promise<any>,
    refreshAuth: () => void
}

export const SessionContext = React.createContext<Session>({
    user: {
        loggedin: false,
        username: "",
        userid: "",
        registertime: 0
    },
    token: "",
    refresh: "",
    updateToken: (token: string) => { },
    getAPI: (url: string) => { return {} as Promise<any> },
    postAPI: (url: string, data: any) => { return {} as Promise<any> },
    refreshAuth: () => { }
});

export const SessionProvider = (props: { children: React.ReactNode }) => {
    const [token, setToken] = React.useState("");
    const [refresh, setRefresh] = React.useState("");
    const [user, setUser] = React.useState({
        loggedin: false,
        username: "",
        userid: "",
        registertime: 0
    });
    function updateToken(token: string) {
        setToken(token);
        console.log(`Token just set to ${token}`);
        localStorage.setItem("token", token);
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

    const fetchToken = (): string | null => {
        console.log("Updating storage token.");
        let storagetoken = localStorage.getItem("token");
        if (storagetoken) {
            console.log(`TOKEN: ${storagetoken}`);
            updateToken(storagetoken);
            return storagetoken;
        }
        return null;
    }

    React.useEffect(() => {
        fetchToken();
    }, []);

    React.useEffect(() => {
        console.log(`Token got set to: ${token}`);
    }, [token]);

    function getAPI(url: string): Promise<any> {
        const useToken: string = fetchToken()!;
        console.log(`Using token ${useToken}`);
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${useToken}`
            }
        });
    }

    function postAPI(url: string, data: any): Promise<any> {
        const useToken: string = fetchToken()!;
        console.log(`Using token ${useToken}`);
        return axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${useToken}`
            }
        });
    }

    function refreshAuth(): void {
        if (!localStorage.getItem("token")) {
            console.log("Not logged in");
            return;
        }

        console.log("Refreshing auth...");
        axios.post(Routes.AUTH.REFRESH, {
            refresh: refresh
        }, {}).then((res) => {
            console.log("Refresh success with token:", res.data.token);
            updateToken(res.data.token);
        }).catch((err) => {
            console.log("Refresh expired. Logging out.");
            logout();
        });
    }

    function logout(): void {
        if (!localStorage.getItem("token")) return;

        setUser({
            loggedin: false,
            username: "",
            userid: "",
            registertime: 0
        });
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <SessionContext.Provider value={{ user, token, refresh, updateToken, getAPI, postAPI, refreshAuth }}>
            {props.children}
        </SessionContext.Provider>
    )
}