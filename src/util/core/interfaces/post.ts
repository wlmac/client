import ApprovalStatus from '../misc/approvalstatus';

interface UserSlug{
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface OrganizationSlug{
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export default interface Post {
  id: number;
  author: UserSlug;
  organization: OrganizationSlug;
  tags: Array<number>;
  created_date: Date;
  last_modified_date: Date;
  title: string;
  body: string;
  status?: ApprovalStatus;
}
