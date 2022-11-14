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
  membership: MembershipStatus;
  owner: number;
  supervisors: Array<number>;
  members: Array<number>;
  execs: Array<number>;
  banner: string;
  icon: string;
  tags: Array<number>;
  links: Array<string>;
}
