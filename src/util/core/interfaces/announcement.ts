import Post from './post';
import User from './user';

export default interface Announcement extends Post {
  supervisor: User;
  rejectionReason?: string;
}
