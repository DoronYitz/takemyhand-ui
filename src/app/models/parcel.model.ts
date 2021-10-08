import { Volunteer } from './volunteer.model';

export interface Parcel {
  _id?: string;
  address?: string;
  arrived?: boolean;
  volunteer?: Volunteer;
  lat?: number;
  lng?: number;
}
