// src/app/services/data-cube.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateService } from '../../../components/statistique/date.service';


@Injectable({
  providedIn: 'root'
})
export class DataCubeService {
  private apiUrl = 'http://localhost:5286/api/topcinqPerimetre';

  constructor(private http: HttpClient, private dateService: DateService) {}

  getData(): Observable<any> {
    return this.dateService.selectedDate$.pipe(
      switchMap(date => {
        const url = `${this.apiUrl}/${date}`;
        return this.http.get(url);
      })
    );
  }
}
