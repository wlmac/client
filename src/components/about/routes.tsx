import { ContentHistory } from "./history"
import { ContentAbout } from "./about"
import { ContentTeam } from "./team"
import { ContentSchool } from "./school"
import { ContentContact } from "./contact"

export const routes = [
    {
        id: "history",
        text: "WLMCI",
        path: "/about/history",
        component: ContentHistory,
    },
    {
        id: "about",
        text: "ABOUT",
        path: "/about/about",
        component: ContentAbout,
    },
    {
        id: "team",
        text: "TEAM",
        path: "/about/team",
        component: ContentTeam,
    },
    {
        id: "map",
        text: "MAP",
        path: "/map",
        component: ContentHistory,
    },
    {
        id: "school",
        text: "CONTACT WLMCI",
        path: "/about/school",
        component: ContentSchool,
    },
    {
        id: "contact",
        text: "CONTACT US",
        path: "/about/contact",
        component: ContentContact,
    },
]