// src/app/components/qte-produite-perimetre/qte-produite-perimetre.component.ts
import { Component, OnInit } from '@angular/core';
import { DataCubeService } from './qte-produite-perimetre.service';
import { DateService } from '../../../components/statistique/date.service';


@Component({
  selector: 'app-qte-produite-perimetre',
  templateUrl: './qte-produite-perimetre.component.html',
  styleUrls: ['./qte-produite-perimetre.component.css']
})
export class QteProduitePerimetreComponent implements OnInit {
  data: any;
  options: any;

  constructor(private dataCubeService: DataCubeService, private dateService: DateService) {}

  ngOnInit() {
    this.dateService.selectedDate$.subscribe(date => {
      this.dataCubeService.getData().subscribe(
        response => {
          const labels: string[] = [];
          const dataValues: number[] = [];

          for (let i = 0; i < Math.min(response.length, 5); i++) {
            labels.push(response[i].nom);
            dataValues.push(response[i].valeur);
          }

          this.data = {
            labels: labels,
            datasets: [
              {
                data: dataValues,
                backgroundColor: ['#8183F4', '#DADAFC', '#4547A9', '#FFD700', '#FFF3AD'],
                hoverBackgroundColor: ['#8183F4', '#DADAFC', '#4547A9', '#FFD700', '#FFF3AD']
              }
            ]
          };

          this.options = {
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
                    return `${labels[dataIndex]}: ${tooltipItem.raw} Bbl`;
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
