import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from 'src/app/models/volunteer.model';

import { environment } from 'src/environments/environment';

@Injectable()
export class VolunteerService {
  baseUrl = environment.backendUrl + '/api/volunteer';
  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.baseUrl);
  }

  getDrivers(): Observable<Volunteer[]> {
    const url = new URL('/drivers', this.baseUrl);
    return this.http.get<Volunteer[]>(url.href);
  }

  getVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    const url = new URL(`/${volunteer._id}`, this.baseUrl);
    return this.http.get<Volunteer>(url.href);
  }

  createVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.baseUrl, volunteer, this.httpOptions);
  }

  editVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    const url = new URL(`/${volunteer._id}`, this.baseUrl);
    return this.http.patch<Volunteer>(url.href, volunteer, this.httpOptions);
  }

  deleteVolunteer(volunteer: Volunteer): Observable<Volunteer> {
    const url = new URL(`/${volunteer._id}`, this.baseUrl);
    return this.http.delete<Volunteer>(url.href, this.httpOptions);
  }
}
