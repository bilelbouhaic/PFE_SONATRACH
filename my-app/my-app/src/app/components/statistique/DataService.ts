import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5286/api/QantiteProduite';
  private apiUrlPerim = 'http://localhost:5286/api/topcinqPerimetre';
  private apiUrl1 = 'http://localhost:5286/api/WilayaData/1';
  private apiUrl3 = 'http://localhost:5286/api/WilayaData/3';
  private apiUrl33 = 'http://localhost:5286/api/WilayaData/33';
  private apiUrlMeteo = 'http://localhost:5286/api/Resultat/1';
  private apiUrlMeteo3 = 'http://localhost:5286/api/Resultat/3';
  private apiUrlMeteo33 = 'http://localhost:5286/api/Resultat/33';

  constructor(private http: HttpClient, private dateService: DateService) { }

  getData(): Observable<any[]> {
    return this.dateService.selectedDate$.pipe(
      switchMap(date => {
        const url1 = `${this.apiUrl}/${date}`;
        const url2 = `${this.apiUrlPerim}/${date}`;
        return forkJoin([
          this.http.get(url1),
          this.http.get(url2),
          this.http.get(this.apiUrl1),
          this.http.get(this.apiUrl3),
          this.http.get(this.apiUrl33),
          this.http.get(this.apiUrlMeteo),
          this.http.get(this.apiUrlMeteo3),
          this.http.get(this.apiUrlMeteo33)
        ]);
      })
    );
  }
}
