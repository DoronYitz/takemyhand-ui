import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  httpOptions = {
    withCredentials: true,
  };

  baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  login(phone: string, password: string) {
    const url = new URL('/api/auth/login', this.baseUrl);
    return this.http.post(url.href, { phone, password }, this.httpOptions);
  }

  logout(refreshToken: string) {
    const url = new URL(`/api/auth/logout/${refreshToken}`, this.baseUrl);
    return this.http.delete(url.href, this.httpOptions);
  }

  refreshToken(token: string) {
    const url = new URL('/api/auth/refreshtoken', this.baseUrl);
    return this.http.post(url.href, { refreshToken: token }, this.httpOptions);
  }
}
