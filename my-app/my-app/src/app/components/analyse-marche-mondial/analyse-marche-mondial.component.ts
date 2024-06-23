import { Component } from '@angular/core';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-analyse-marche-mondial',
  templateUrl: './analyse-marche-mondial.component.html',
  styleUrl: './analyse-marche-mondial.component.css'
})
export class AnalyseMarcheMondialComponent {
  selectedDate: string;
  download = faFileDownload;

  
  constructor() {
    this.selectedDate = '';
  }
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
  }
}
