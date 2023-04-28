export default interface Event {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    organization: number;
    should_announce: boolean;
    description: string;
    tags: Array<Number>;
}