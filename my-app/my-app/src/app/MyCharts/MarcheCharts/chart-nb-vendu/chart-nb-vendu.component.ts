import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { VehiculeService } from './VHvenduService';

@Component({
  selector: 'app-chart-nb-vendu',
  templateUrl: './chart-nb-vendu.component.html',
  styleUrls: ['./chart-nb-vendu.component.css']
})
export class ChartNbVenduComponent implements OnInit {
  data: any;
  options: any;

  constructor(private vehiculeService: VehiculeService) { }

  ngOnInit() {
    // Fetch data from service
    forkJoin({
      vehiculeData: this.vehiculeService.getVentesVehiculesElectriques()
    }).subscribe(({ vehiculeData }) => {
      console.log('Data from API:', vehiculeData); // Log the data received from the API

      const electricVehiclesData = vehiculeData; // Assuming vehiculeData is an array of numbers

      this.data = {
        labels: [ '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022','2023'],
        datasets: [
          {
            label: 'Prix du Petrole',
            data:  [111.26, 109.45, 105.87, 96.29, 50.80, 43.74, 54.19, 64.90, 56.99, 39.16, 68.17, 98.57, 100.45],
            yAxisID: 'y-axis-2',
            borderColor: '#F4A261',
            backgroundColor: '#F4A261',
            fill: false
          },
          {
            label: 'Prix du GPL',
            data:[850, 800, 700, 600, 400, 350, 450, 500, 450, 300, 500, 750, 780]
            ,
            yAxisID: 'y-axis-2',
            borderColor: '#42A5F5',
            backgroundColor: '#42A5F5',
            fill: false
          },
          {
            label: 'Ventes de véhicules électriques',
            data: electricVehiclesData,
            yAxisID: 'y-axis-1',
            borderColor: '#66BB6A',
            backgroundColor: '#66BB6A',
            fill: false
          }
        ]
      };

      this.options = {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Mois'
            }
          },
          'y-axis-1': {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Ventes de véhicules électriques'
            }
          },
          'y-axis-2': {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Prix'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      };
    });
  }
}
