import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parcel } from '../models/parcel.model';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  baseUrl = environment.backendUrl + '/api/parcel';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  fileHttpOptions = {
    headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.baseUrl);
  }

  getParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.get<Parcel>(`${this.baseUrl}/${parcel._id}`);
  }

  createParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(
      this.baseUrl,
      JSON.stringify(parcel),
      this.httpOptions
    );
  }

  createParcelsFromTextFile(textFile: File): Observable<Parcel[]> {
    const formData: FormData = new FormData();
    formData.append('textFile', textFile, textFile.name);
    return this.http.post<Parcel[]>(
      `${this.baseUrl}/textFileHandler`,
      formData,
      this.fileHttpOptions
    );
  }

  editParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.patch<Parcel>(
      `${this.baseUrl}/${parcel._id}`,
      JSON.stringify(parcel),
      this.httpOptions
    );
  }

  deleteParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.delete<Parcel>(
      `${this.baseUrl}/${parcel._id}`,
      this.httpOptions
    );
  }
}
