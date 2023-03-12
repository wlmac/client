export interface Timetable {
    id: number;
    owner: {
        id: number;
        slug: string;
    }
    term: {
        id: number;
        name: string;
        description: string;
        timetable_format: string;
        start_date: string;
        end_date: string;
        is_frozen: boolean;
    }
    courses: Array<Course>
}

export interface Course {
    id: number;
    code: string;
    description: string;
    position: number;
    term: number;
    submitter: number;
}