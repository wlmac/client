import ApprovalStatus from '../misc/approvalstatus';
import Organization from './organization';
import Tag from './tag';
import User from './user';

export default interface Post {
  id: number;
  author: User;
  organization: Organization;
  tags: Array<Tag>;
  created: Date;
  modified: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
