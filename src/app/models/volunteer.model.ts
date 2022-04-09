/**
 * Volunter interface
 */
export interface Volunteer {
  /**
   * Mongo id
   */
  _id: string;
  /**
   * Full name
   * @example 'Shir ezra'
   */
  full_name: string;
  /**
   * Phone number
   * @example '0532313239'
   */
  phone: string;
  /**
   * Is a driver bool
   * @example true,false
   */
  driver: boolean;
  /**
   * Volunteer address or nearby address
   */
  address: string;
}
