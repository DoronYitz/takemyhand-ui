import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.backendUrl + '/api/message';
  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl);
  }
}
