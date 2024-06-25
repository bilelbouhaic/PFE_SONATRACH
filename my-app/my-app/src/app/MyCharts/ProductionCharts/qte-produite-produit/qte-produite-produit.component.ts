import { DateService } from '../../../components/statistique/date.service';
import { DataCubeService } from './../../FiscaliteCharts/perimetre-taxe/perimetre-taxe.service';
import { Component, OnInit } from '@angular/core';
import { DataCubeService1 } from './qte-produite-produit.service';


@Component({
  selector: 'app-qte-produite-produit',
  templateUrl: './qte-produite-produit.component.html',
  styleUrls: ['./qte-produite-produit.component.css']
})
export class QteProduiteProduitComponent implements OnInit {
  data: any;
  options: any;
  

  constructor(private dataCubeService: DataCubeService1, private dateService:DateService ) {}

  ngOnInit() {
    // S'abonner aux changements de date
    this.dateService.selectedDate$.subscribe(date => {
      // Appeler le service pour obtenir les données en fonction de la nouvelle date
      this.dataCubeService.getData().subscribe(
        response => {
          const labels = Object.keys(response);
          const dataValues = Object.values(response);

          this.data = {
            labels: labels,
            datasets: [
              {
                data: dataValues,
                backgroundColor: ['#8183F4', '#DADAFC', '#4547A9', '#FFD700','#FFF3AD '],
                hoverBackgroundColor: ['#8183F4', '#DADAFC', '#4547A9', '#FFD700','#FFF3AD ']
              }
            ]
          };

          this.options = {
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true
              }
            },
            
          };
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    });
  }
}
