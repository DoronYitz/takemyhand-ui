import { Volunteer } from './volunteer.model';

export interface Parcel {
  _id?: string;
  address?: string;
  for?: string;
  arrived?: boolean;
  volunteer?: Volunteer;
}
