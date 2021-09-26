import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  baseUrl = environment.backendUrl + '/api/auth';
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  login(phone: string, password: string) {
    return this.http
      .post(
        `${this.baseUrl}/login`,
        JSON.stringify({ phone, password }),
        this.httpOptions
      )
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        (err) => console.log(err)
      );
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    return true;
  }
}
