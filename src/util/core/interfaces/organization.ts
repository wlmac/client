import { Url } from 'url';
import Media from '../misc/media';
import MembershipStatus from '../misc/membership';
import Tag from './tag';

export interface OrganizationUser {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  gravatar_url: string
}

export default interface Organization {
  name: string;
  id: number;
  bio: string;
  footer: string;
  slug: string;
  hideMembers: boolean;
  is_open: boolean; // Open Membership
  applications_open: boolean; // Accepting Applications
  owner: number;
  supervisors: Array<number>;
  members: Array<OrganizationUser>;
  execs: Array<OrganizationUser>;
  banner: string;
  icon: string;
  tags: Array<number>;
  links: Array<string>;
}
