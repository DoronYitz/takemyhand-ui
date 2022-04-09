import { Volunteer } from './volunteer.model';

/**
 * Parcel interface
 */
export interface Parcel {
  /**
   * Mongo id
   */
  _id: string;
  /**
   * Address of the parcel
   */
  address: string;
  /**
   * arrived status
   * @example true,false
   */
  arrived: boolean;
  /**
   * In change volunteer
   */
  volunteer: Volunteer;
  /**
   * driver name, used only in ui
   */
  driverName?: string;
}
