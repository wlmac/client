import { AnnouncementFeed } from "../../util/models"

export const AnnouncementFeeds: Array<AnnouncementFeed> = [
    {
        id: "all",
        text: "ALL",
        filters: "",
    },
    {
        id: "school",
        text: "SCHOOL",
        filters: "&organization=2",
    },
    {
        id: "sac",
        text: "STUDENT COUNCIL",
        filters: "&organization=8",
    }
]
