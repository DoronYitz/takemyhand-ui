import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.backendUrl + '/api/user';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${user._id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl,
      JSON.stringify(user),
      this.httpOptions
    );
  }
}
