import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDateSource = new BehaviorSubject<string>('2017-05-10');
  selectedDate$ = this.selectedDateSource.asObservable();

  updateDate(date: string) {
    this.selectedDateSource.next(date);
  }
}
