import User from './user';

export default interface Course {
  code: string;
  //term: Term
  description: string;
  position: number;

  submitter?: User;
}
