import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Hardware {
  private readonly http = inject (HttpClient)
  private readonly apiUrl = "https://api-senai-angular.vercel.app/api"

  getAll (): Observable<any> {
    return this.http.get(this.apiUrl + "/hardware")
  }
}
