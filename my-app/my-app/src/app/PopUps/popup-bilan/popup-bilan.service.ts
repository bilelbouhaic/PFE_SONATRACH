import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BilanService {
  private baseUrl = 'http://localhost:5286/api/bilan/GenerateBilanPDF'; // Base URL for the API

  constructor(private http: HttpClient) { }

  generateBilanPDF(date: string): Observable<Blob> {
    const url = `${this.baseUrl}/${date}`; // Construct the full URL with the date parameter
    return this.http.get(url, {
      responseType: 'blob' // Set the response type to blob
    });
  }
}
