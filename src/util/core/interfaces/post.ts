import ApprovalStatus from '../misc/approvalstatus';
import Organization from './organization';
import Tag from './tag';

export default interface Post {
  id: number;
  author: number;
  organization: string;
  tags: Array<number>;
  created_date: Date;
  last_modified_date: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
