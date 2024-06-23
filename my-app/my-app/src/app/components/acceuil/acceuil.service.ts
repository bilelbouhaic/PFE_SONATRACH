import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../statistique/date.service';
import { DateService2 } from './date2.service';

@Injectable({
  providedIn: 'root'
})
export class DataCubeServiceKpi {
  private apiUrl = 'http://localhost:5286/api/Kpi';
  constructor(private http: HttpClient, private dateService: DateService2) { }

  getData(): Observable<any> {
    return this.dateService.selectedDate$.pipe(
      switchMap(date => {
        const url = `${this.apiUrl}/${date}`;
        return this.http.get(url);
      })
    );
  }
}
