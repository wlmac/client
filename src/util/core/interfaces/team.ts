import { UserField } from './post';


export default interface TeamMember {
  user: UserField;
  bio: string
  positions: Array<string>;
  positions_leading: Array<string>;
  years: Array<string>;
  is_alumni: boolean
}
