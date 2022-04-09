import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  httpOptions = {
    withCredentials: true,
  };

  baseUrl = environment.backendUrl + '/api/auth';
  constructor(private http: HttpClient) {}

  login(phone: string, password: string) {
    const url = new URL('/login', this.baseUrl);
    return this.http.post(url.href, { phone, password }, this.httpOptions);
  }

  logout(refreshToken: string) {
    const url = new URL('/logout', this.baseUrl);
    return this.http.post(url.href, { refreshToken }, this.httpOptions);
  }

  refreshToken(token: string) {
    const url = new URL('/refreshtoken', this.baseUrl);
    return this.http.post(url.href, { refreshToken: token }, this.httpOptions);
  }
}
