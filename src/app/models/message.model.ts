/**
 * Messsage interface used for arrived status changed by any driver/admin on the platform
 */
export interface Message {
  /**
   * Arrived status changed to
   */
  arrived: boolean;
  /**
   * Content of the message
   */
  content: string;
  /**
   * When
   */
  date: Date;
}
