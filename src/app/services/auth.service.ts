import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    withCredentials: true,
  };

  baseUrl = environment.backendUrl + '/api/auth';
  constructor(private http: HttpClient) {}

  login(phone: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/login`,
      { phone, password },
      this.httpOptions
    );
  }

  logout(refreshToken: string) {
    return this.http.post(
      `${this.baseUrl}/logout`,
      { refreshToken },
      this.httpOptions
    );
  }

  refreshToken(token: string) {
    return this.http.post(
      this.baseUrl + '/refreshtoken',
      {
        refreshToken: token,
      },
      this.httpOptions
    );
  }
}
