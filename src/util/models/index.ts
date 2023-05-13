export interface AboutRoute {
    id: string;
    text: string;
    path: string;
    component: () => JSX.Element;
}

export interface AnnouncementFeed {
    id: string;
    text: string;
    filters: string;
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

export type AnnouncementInputs = {
    title: string,
    tags: number[],  // tag ids
    body: string,
    organization: string,
    show_after: string,
    supervisor: string,
}
