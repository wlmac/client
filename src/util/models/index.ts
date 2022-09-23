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
