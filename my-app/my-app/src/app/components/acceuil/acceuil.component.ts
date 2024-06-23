import { Component, AfterViewInit } from '@angular/core';
import { DataCubeServiceKpi } from './acceuil.service';
import { DateService2 } from './date2.service';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { DataService2 } from './DataService2';
import { PdfService3 } from './PdfService2';


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements AfterViewInit {
  download = faFileDownload;

  selectedDate: string;
  kpi1 = 0;
  kpi2 = 0;
  kpi3 = 0;

  constructor(
    private dataCubeService: DataCubeServiceKpi,
    private dateService: DateService2,
    private dataService: DataService2,
    private pdfService: PdfService3
  ) {
    this.selectedDate = '2017-05-10'; // Initialize with the default date
  }

  generatePdf() {
    this.dataService.getData().subscribe((data) => {
      console.log("Data loaded successfully");
      console.log(data);
      const [taxeData, rentableData, kpiData] = data;

      // Assure que kpiData a les propriétés attendues avant de générer le PDF
      const kpiValues = {
        valeur: kpiData.valeur !== undefined ? kpiData.valeur : 0,
        valeur1: kpiData.valeur1 !== undefined ? kpiData.valeur1 : 0,
        valeur2: kpiData.valeur2 !== undefined ? kpiData.valeur2 : 0
      };

      console.log("KPI Values:", kpiValues); // Vérifiez que les valeurs KPI sont correctes

      this.pdfService.generatePdf(taxeData, rentableData, kpiValues);
    });
  }

  onDateChange(date: string) {
    this.dateService.updateDate(date);
  }

  ngAfterViewInit() {
    // Subscribe to date changes
    this.dateService.selectedDate$.subscribe(date => {
      // Call the service to get data based on the new date
      this.dataCubeService.getData().subscribe(
        response => {
          console.log(response[0]);
          this.kpi1 = parseFloat(response[0].valeur.toFixed(2));
          this.kpi2 = parseFloat(response[0].valeur1.toFixed(2));
          this.kpi3 = parseFloat(response[0].valeur2.toFixed(2));
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    });
  }
}
