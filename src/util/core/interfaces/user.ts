import Organization from './organization';
import Tag from './tag';
import Ref from './ref';

export default interface User {
  id: number;
  slug: string;
  name: [string, string];
  bio: string;
  timezone: string;
  graduatingYear: number;
  organizations: Ref<number, Organization>[];
  following: Ref<number, Tag>[];
}
