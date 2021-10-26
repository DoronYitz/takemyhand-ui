export interface AuthRes {
  accessToken?: string;
  refreshToken?: string;
  roles?: Array<string>;
  username?: string;
  id?: string;
}
