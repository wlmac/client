import FetchedObject from "./fetched";

export interface ScheduleSlot {
    description: {
        time: string;
        course: string;
    }
    time: {
        start: string;
        end: string;
    }
    position: Array<number>;
    cycle: string;
    course: string; // Course code
}