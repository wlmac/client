export interface Timetable {
    id: number;
    owner: {
        id: number;
        slug: string;
    }
    term: Term
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

export interface Term{
    id: number;
    courses: Array<Course>;
    name: string;
    description: string;
    timetable_format: string;
    start_date: string;
    end_date: string;
    is_frozen: boolean;
}