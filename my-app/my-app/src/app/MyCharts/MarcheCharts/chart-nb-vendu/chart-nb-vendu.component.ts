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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Prix du Petrole',
            data:  [53.83, 54.62, 51.85, 51.61, 50.92, 46.48, 48.65, 48.43, 50.79, 54.58, 59.68, 64.36],
            yAxisID: 'y-axis-2',
            borderColor: '#F4A261',
            backgroundColor: '#F4A261',
            fill: false
          },
          {
            label: 'Prix du GPL',
            data: [30, 31, 32, 33, 34, 33, 32, 31, 32, 34, 35, 36],
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
