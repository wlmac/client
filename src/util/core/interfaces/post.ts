import ApprovalStatus from '../misc/approvalstatus';

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
  tags: Array<number>;
  created_date: Date;
  last_modified_date: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
