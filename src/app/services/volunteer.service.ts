import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Volunteer } from '../models/volunteer.model';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService {
  baseUrl = environment.backendUrl + '/api/volunteer';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.baseUrl);
  }

  getVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${this.baseUrl}/${volunteer._id}`);
  }

  createVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(
      this.baseUrl,
      JSON.stringify(volunteer),
      this.httpOptions
    );
  }

  editVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.patch<Volunteer>(
      `${this.baseUrl}/${volunteer._id}`,
      JSON.stringify(volunteer),
      this.httpOptions
    );
  }

  deleteVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.delete<Volunteer>(
      `${this.baseUrl}/${volunteer._id}`,
      this.httpOptions
    );
  }
}
