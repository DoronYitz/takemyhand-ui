import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
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
    return this.http.get<IEvent>(`${this.baseUrl}/active`);
  }

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.baseUrl, event, this.httpOptions);
  }

  editEvent(event: IEvent): Observable<IEvent> {
    return this.http.patch<IEvent>(
      `${this.baseUrl}/${event._id}`,
      event,
      this.httpOptions
    );
  }

  editEventSecret(event: IEvent): Observable<IEvent> {
    return this.http.patch<IEvent>(
      `${this.baseUrl}/secret/${event._id}`,
      event,
      this.httpOptions
    );
  }

  deleteEvent(event: IEvent): Observable<IEvent> {
    return this.http.delete<IEvent>(
      `${this.baseUrl}/${event._id}`,
      this.httpOptions
    );
  }
}
