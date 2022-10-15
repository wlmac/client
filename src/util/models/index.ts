export interface AboutRoute {
    id: string;
    text: string;
    path: string;
    component: () => JSX.Element;
}

export interface AnnouncementFeed {
    id: string;
    text: string;
    filters: null;
}

export type RegisterInputs = {
    CSRF_TOKEN: string,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    graduating_year: number,
    password: string,
    confirm_password: string,
}
