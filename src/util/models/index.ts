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

export interface BlogPost {
    author: number;
    organization: number;
    tags: Array<number>;
    status: "pending" | "approved";
    featuredImage: string; // URL format
}
