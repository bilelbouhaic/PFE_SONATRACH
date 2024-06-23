import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateService2 } from '../../../components/acceuil/date2.service';

@Injectable({
  providedIn: 'root'
})
export class DataCubeService {
  private apiUrl = 'http://localhost:5286/api/PerimetreRentable';

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
