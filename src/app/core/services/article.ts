import { inject, Injectable, signal } from '@angular/core';
import { HardwareModel } from '../models/hardwareModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtigosService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = "https://api-senai-angular.vercel.app/api"

  getAll(): Observable<any>{
    return this.http.get(this.apiUrl + "/hardware")
  }
  getById(id: any): Observable<any>{
    return this.http.get(this.apiUrl + "/hardware/" + id);
  }
  create(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + "/hardware", formData)
  }
  update(formData: FormData, id: any): Observable<any> {
    return this.http.put(this.apiUrl + "/hardware/" + id, formData)
  }
  delete(id: any): Observable<any> {
    return this.http.delete (this.apiUrl + "/hardware/" + id)
  }
}