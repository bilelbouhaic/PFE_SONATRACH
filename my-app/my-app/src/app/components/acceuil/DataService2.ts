import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateService2 } from './date2.service';

@Injectable({
  providedIn: 'root'
})
export class DataService2 {
    private UrlPtaxe = 'http://localhost:5286/api/PerimetreTaxe';
    private UrlPrentable = 'http://localhost:5286/api/PerimetreRentable';
    private UrlKpi = 'http://localhost:5286/api/Kpi';

  constructor(private http: HttpClient, private dateService: DateService2) { }

  getData(): Observable<any[]> {
    return this.dateService.selectedDate$.pipe(
      switchMap(date => {
        const url1 = `${this.UrlPrentable}/${date}`;
        const url2 = `${this.UrlPtaxe}/${date}`;
        const url3 = `${this.UrlKpi}/${date}`;
        
        return forkJoin([
            this.http.get(url1),
            this.http.get(url2),
            this.http.get(url3),
        ]);
      })
    );
  }
}
