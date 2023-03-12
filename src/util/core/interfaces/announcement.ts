import { User } from '../session';
import Post from './post';

export default interface Announcement extends Post {
  supervisor: User;
  rejectionReason?: string;
}
