import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Declaration {
    dateRdv: string;
    averageTauxRdv: number;
    totalBaseRdv: number;
    totalMontantRdv: number;
    typesRdv: string[];
  }
  

@Injectable({
  providedIn: 'root'
})
export class DeclarationsService {

  private apiUrl = 'http://localhost:5286/api/Declarations'; // Remplacez par l'URL correcte de votre API

  constructor(private http: HttpClient) { }

  getDeclarations(): Observable<Declaration[]> {
    return this.http.get<Declaration[]>(this.apiUrl);
  }
}
