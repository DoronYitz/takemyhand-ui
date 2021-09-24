import { Volunteer } from './volunteer.model';

export interface User {
  _id?: string;
  email?: string;
  password?: string;
  neighborhood?: string;
  role?: 'driver' | 'admin';
  volunteer?: Volunteer;
}
