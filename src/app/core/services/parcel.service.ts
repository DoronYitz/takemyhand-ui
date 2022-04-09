import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel } from 'src/app/models/parcel.model';

import { environment } from 'src/environments/environment';

@Injectable()
export class ParcelService {
  baseUrl = environment.backendUrl + '/api/parcel';
  httpOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.baseUrl);
  }

  getDriverParcels(): Observable<Parcel[]> {
    const url = new URL('/driverparcels', this.baseUrl);
    return this.http.get<Parcel[]>(url.href);
  }

  getParcel(parcel: Parcel): Observable<Parcel> {
    const url = new URL(`/${parcel._id}`, this.baseUrl);
    return this.http.get<Parcel>(url.href);
  }

  createParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(this.baseUrl, parcel, this.httpOptions);
  }

  createParcelsFromTextFile(textFile: File): Observable<Parcel[]> {
    const url = new URL('/textFileHandler', this.baseUrl);
    const formData: FormData = new FormData();
    formData.append('textFile', textFile, textFile.name);
    return this.http.post<Parcel[]>(url.href, formData, this.httpOptions);
  }

  editParcel(parcel: Parcel): Observable<Parcel> {
    const url = new URL(`/${parcel._id}`, this.baseUrl);
    return this.http.patch<Parcel>(url.href, parcel, this.httpOptions);
  }

  editParcelStatus(parcel: Parcel): Observable<Parcel> {
    const url = new URL(`/status/${parcel._id}`, this.baseUrl);
    return this.http.patch<Parcel>(url.href, parcel, this.httpOptions);
  }

  deleteParcel(parcel: Parcel): Observable<Parcel> {
    const url = new URL(`/${parcel._id}`, this.baseUrl);
    return this.http.delete<Parcel>(url.href, this.httpOptions);
  }

  setDrivers(): Observable<Parcel[]> {
    const url = new URL('/setdrivers', this.baseUrl);
    return this.http.patch<Parcel[]>(url.href, {}, this.httpOptions);
  }
}
