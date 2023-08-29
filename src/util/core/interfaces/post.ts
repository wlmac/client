import ApprovalStatus from '../misc/approvalstatus';
import { User } from '../session';
import Organization from './organization';
import Tag from './tag';

interface UserField{
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface OrganizationField{
  id: number;
  name: string;
  slug: string;
  icon: string; // a url!
}

export default interface Post {
  id: number;
  author: UserField;
  organization: OrganizationField;
  tags: Array<Tag>;
  created_date: Date;
  last_modified_date: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
