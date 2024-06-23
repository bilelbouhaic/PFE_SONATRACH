import { Component } from '@angular/core';
import { DateService } from './date.service';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './DataService';
import { PdfService } from './PdfService';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent {
  download = faFileDownload;
  selectedDate: string;

  constructor(private dateService: DateService, private dataService: DataService, private pdfService: PdfService) {
    this.selectedDate = '2017-05-10'; // Initialize with the default date
  }

  generatePdf() {
    this.dataService.getData().subscribe((data) => {
      console.log("Data loaded successfully");
      console.log(data);
      const [data1, data2, data3, data4, data5, dataMeteo1, dataMeteo3, dataMeteo33] = data;
      this.pdfService.generatePdf(data1, data2, data3, data4, data5, dataMeteo1, dataMeteo3, dataMeteo33);
    });
  }

  onDateChange(date: string) {
    this.dateService.updateDate(date);
  }
}
