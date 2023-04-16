import { User } from "../session";

export default interface Course {
  code: string;
  //term: Term
  description: string;
  position: number;

  submitter?: User;
}
