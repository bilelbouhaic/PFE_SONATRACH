// vehicule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private apiUrl = 'http://localhost:5286/api/CubeMarche'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getVentesVehiculesElectriques(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
