const getToken = (): string => {
    return localStorage.getItem("token")!;
}

const setToken = (token: string): void => {
    localStorage.setItem("token", token);
}

const getRefresh = (): string => {
    return localStorage.getItem("refresh")!;
}

const setRefresh = (refreshToken: string): void => {
    localStorage.setItem("refresh", refreshToken);
}

const loggedIn = (): boolean => {
    return !(!localStorage.getItem("token"));
}

export { getToken, setToken, getRefresh, setRefresh, loggedIn };
