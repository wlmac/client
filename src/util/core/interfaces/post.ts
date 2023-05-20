import ApprovalStatus from '../misc/approvalstatus';
import { User } from '../session';
import Organization from './organization';
import Tag from './tag';

export default interface Post {
  id: number;
  author: User;
  organization: Organization;
  tags: Array<number>;
  created_date: Date;
  last_modified_date: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
