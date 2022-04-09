import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IEvent } from '../../models/event.model';

@Injectable()
export class EventService {
  baseUrl = environment.backendUrl + '/api/events';
  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.baseUrl);
  }

  getActiveEvent(): Observable<IEvent> {
    const url = new URL('/active', this.baseUrl);
    return this.http.get<IEvent>(url.href);
  }

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.baseUrl, event, this.httpOptions);
  }

  editEvent(event: IEvent): Observable<IEvent> {
    const url = new URL(`/${event._id}`, this.baseUrl);
    return this.http.patch<IEvent>(url.href, event, this.httpOptions);
  }

  editEventSecret(event: IEvent): Observable<IEvent> {
    const url = new URL(`/secret/${event._id}`, this.baseUrl);
    return this.http.patch<IEvent>(url.href, event, this.httpOptions);
  }

  deleteEvent(event: IEvent): Observable<IEvent> {
    const url = new URL(`/${event._id}`, this.baseUrl);
    return this.http.delete<IEvent>(url.href, this.httpOptions);
  }

  deleteEventData(): Observable<any> {
    const url = new URL(`/data`, this.baseUrl);
    return this.http.delete<any>(url.href, this.httpOptions);
  }
}