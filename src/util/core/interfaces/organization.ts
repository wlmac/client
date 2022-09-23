import Media from '../misc/media';
import MembershipStatus from '../misc/membership';
import Tag from './tag';
import User from './user';

export default interface Organization {
  name: string;
  id: number;
  bio: string;
  footer: string;
  slug: string;
  hideMembers: boolean;
  membership: MembershipStatus;
  owner: User;
  supervisors: Array<User>;
  execs: Array<User>;
  banner: Media;
  icon: Media;
  tags: Array<Tag>;
  urls: Array<URL>;
}
