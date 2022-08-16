import { ContentHistory } from "./history"
import { ContentAbout } from "./about"
import { ContentTeam } from "./team"
import { ContentSchool } from "./school"
import { ContentContact } from "./contact"
import { AboutRoute } from "../../util/models"

export const AboutRoutes: Array<AboutRoute> = [
    {
        id: "history",
        text: "WLMCI",
        path: "/about?tab=history",
        component: ContentHistory,
    },
    {
        id: "about",
        text: "ABOUT",
        path: "/about?tab=about",
        component: ContentAbout,
    },
    {
        id: "team",
        text: "TEAM",
        path: "/about?tab=team",
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
        path: "/about?tab=school",
        component: ContentSchool,
    },
    {
        id: "contact",
        text: "CONTACT US",
        path: "/about?tab=contact",
        component: ContentContact,
    },
]
