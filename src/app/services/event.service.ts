import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  baseUrl = environment.backendUrl + '/api/event';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getIEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.baseUrl);
  }

  getIEvent(event: IEvent): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.baseUrl}/${event._id}`);
  }

  createIEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(
      this.baseUrl,
      JSON.stringify(event),
      this.httpOptions
    );
  }

  editIEvent(event: IEvent): Observable<IEvent> {
    return this.http.patch<IEvent>(
      `${this.baseUrl}/${event._id}`,
      JSON.stringify(event),
      this.httpOptions
    );
  }

  deleteIEvent(event: IEvent): Observable<IEvent> {
    return this.http.delete<IEvent>(
      `${this.baseUrl}/${event._id}`,
      this.httpOptions
    );
  }
}
