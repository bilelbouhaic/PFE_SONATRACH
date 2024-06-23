import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trp {
    dateTrp: string;
    averageTauxTrp: number;
    totalMontantTrp: number;
  }
  

@Injectable({
  providedIn: 'root'
})
export class TrpgetService {

  private apiUrl = 'http://localhost:5286/api/TrpGet'; // Remplacez par l'URL correcte de votre API

  constructor(private http: HttpClient) { }

  getDeclarations(): Observable<Trp[]> {
    return this.http.get<Trp[]>(this.apiUrl);
  }
}
