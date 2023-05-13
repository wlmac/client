import ApprovalStatus from '../misc/approvalstatus';

interface UserSlug{
  id: number;
  slug: string;
}

interface OrganizationSlug{
  id: number;
  slug: string;
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
