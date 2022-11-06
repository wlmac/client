import ApprovalStatus from '../misc/approvalstatus';
import Organization from './organization';
import Tag from './tag';

export default interface Post {
  id: number;
  author: string;
  organization: string;
  tags: Array<number>;
  created: Date;
  modified: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
