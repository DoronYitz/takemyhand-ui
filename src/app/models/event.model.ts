/**
 * Represent event day, driving packages day
 * **Used I convetion just to avoid any conflict with Native event class**
 */
export interface IEvent {
  /**
   * Mongo id
   */
  _id?: string;
  /**
   * Event title
   * @example 'Rosh Hashana'
   */
  title: string;
  /**
   * @example 'Packaging day'
   */
  category: string;
  /**
   * @example 'It will be fun helping others'
   */
  description: string;
  /**
   * Day of the event
   */
  date: Date;
  /**
   * Active event, means its the next event people will register to.
   * Only one event active at a time, or none
   * @example true,false
   */
  active: boolean;
  /**
   * Event secret, used to logging as a driver
   * @example 'v0z3jdR@'
   */
  secret: string;
  /**
   * Used for search in tables
   */
  fixedDate?: string;
}
