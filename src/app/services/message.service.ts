import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.backendUrl + '/api/message';
  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getMessages(): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(this.baseUrl);
  }
}
