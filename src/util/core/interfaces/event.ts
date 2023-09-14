import Organization from "./organization";
import Tag from "./tag";

export default interface Event {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    organization: Organization;
    should_announce: boolean;
    description: string;
    is_public: boolean;
    term: number;
    tags: Tag[];
}