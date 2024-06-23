import { Component, AfterViewInit } from '@angular/core';
import { DataCubeService } from './perimetre-rentable.service';
import { DateService2 } from '../../../components/acceuil/date2.service';

@Component({
  selector: 'app-perimetre-rentable',
  templateUrl: './perimetre-rentable.component.html',
  styleUrls: ['./perimetre-rentable.component.css']
})
export class PerimetreRentableComponent implements AfterViewInit {
  chartData: any;
  chartOptions: any;

  constructor(private dataCubeService: DataCubeService, private dateService: DateService2) {}

  ngAfterViewInit() {
    // S'abonner aux changements de date
    this.dateService.selectedDate$.subscribe(date => {
      // Appeler le service pour obtenir les données en fonction de la nouvelle date
      this.dataCubeService.getData().subscribe(
        response => {
          console.log(response);

          // Créer les vecteurs pour les noms et les valeurs
          const labels: string[] = [];
          const dataValues: number[] = [];

          // Remplir les vecteurs avec les valeurs de la réponse (jusqu'à 5 éléments)
          for (let i = 0; i < Math.min(response.length, 5); i++) {
            labels.push(response[i].nom);
            dataValues.push(response[i].valeur);
          }

          this.chartData = {
            labels: labels,
            datasets: [
              {
                data: dataValues,
                backgroundColor: ['#8183F4', '#DADAFC', '#4547A9', '#FFD700','#FFF3AD '],
                hoverBackgroundColor: ['#8183F4', '#DADAFC', '#4547A9', '#FFD700','#FFF3AD ']
              }
            ]
          };

          this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem: { dataIndex: number; raw: any; }) => {
                    const dataIndex = tooltipItem.dataIndex as number;
                    return `${labels[dataIndex]}: ${tooltipItem.raw} USD`;
                  }
                }
              }
            }
          };
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    });
  }
}
