import User from './user';
import Role from '../misc/role';

export default interface Staff extends User {
  staffBio?: string;
  roles: Array<Role>;
}
