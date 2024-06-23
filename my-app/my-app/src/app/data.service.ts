import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://your-api-url.com'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getTemperatureData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/temperature`);
  }

  getQuantityData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quantity`);
  }
}
