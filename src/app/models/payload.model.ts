/**
 * Login route response
 */
export interface AuthRes {
  /**
   * access token
   */
  accessToken: string;
  /**
   * refresh token
   */
  refreshToken: string;
  /**
   * User permissions
   */
  roles: Array<string>;
  /**
   * username
   */
  username: string;
  id: string;
}
