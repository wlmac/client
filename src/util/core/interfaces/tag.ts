import Color from '../misc/color';
import Organization from './organization';

export default interface Tag {
  id: number;
  name: string;
  color: Color;
  organization?: Organization;
}
