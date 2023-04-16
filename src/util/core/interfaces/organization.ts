import Media from '../misc/media';
import MembershipStatus from '../misc/membership';
import Tag from './tag';

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
  members: Array<number>;
  execs: Array<number>;
  banner: string;
  icon: string;
  tags: Array<number>;
  links: Array<string>;
}
