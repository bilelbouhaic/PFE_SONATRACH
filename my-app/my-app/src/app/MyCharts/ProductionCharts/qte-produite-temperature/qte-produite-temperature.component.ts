import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { WilayaQTeService } from './wilayaqteService';

@Component({
  selector: 'app-qte-produite-temperature',
  templateUrl: './qte-produite-temperature.component.html',
  styleUrls: ['./qte-produite-temperature.component.css'],
})
export class QteProduiteTemperatureComponent implements OnInit {
  data: any;
  options: any;

  constructor(private service: WilayaQTeService) {}

  ngOnInit() {
    forkJoin({
      response1: this.service.getData1(),
      response2: this.service.getData3(),
      response3: this.service.getData33(),
      response4: this.service.getDataMeteoAdrar(),
      response5: this.service.getDataMeteoLaghouat(),
      response6: this.service.getDataMeteoIllizi()
    }).subscribe(({ response1, response2, response3, response4, response5,response6 }) => {
      console.log(response4);
      
      const Adrar = this.extractValues(response1);
      const Laghouat = this.extractValues(response2);
      const Illizi = this.extractValues(response3);
      const MeteoAdrar = response4[0];
      const MeteoLaghouat = response5[0];
      const MeteoIllizi = response6[0];

      this.data = {
        labels: [
          'janvier',
          'fevrier',
          'mars',
          'avril',
          'mai',
          'juin',
          'juillet',
          'aout',
          'septembre',
          'octobre',
          'novembre',
          'decembre',
        ],
        datasets: [
          {
            label: 'Adrar',
            data: Adrar,
            yAxisID: 'y-axis-2',
            borderColor: '#8183F4',
            backgroundColor: '#8183F4',
            fill: false,
            hidden: false, // Afficher par défaut
          },
          {
            label: 'Laghouat',
            data: Laghouat,
            yAxisID: 'y-axis-2',
            borderColor: '#DADAFC',
            backgroundColor: '#DADAFC',
            fill: false,
            hidden: true, // Afficher par défaut
          },
          {
            label: 'Illizi',
            data: Illizi,
            yAxisID: 'y-axis-2',
            borderColor: '#4547A9',
            backgroundColor: '#4547A9',
            fill: false,
            hidden: true, // Afficher par défaut
          },
          {
            label: 'Meteo Adrar',
            data: MeteoAdrar,
            yAxisID: 'y-axis-1',
            
            borderColor: '#FFD700',
            backgroundColor: '#FFD700',
            fill: false,
            hidden: false, // Afficher par défaut
          },
          {
            label: 'Meteo Laghouat',
            data: MeteoLaghouat,
            yAxisID: 'y-axis-1',
            
            borderColor: 'green',
            backgroundColor: 'green',
            fill: false,
            hidden: true, // Afficher par défaut
          },
          {
            label: 'Meteo Illizi',
            data: MeteoIllizi,
            yAxisID: 'y-axis-1',
            
            borderColor: 'red',
            backgroundColor: 'red',
            fill: false,
            hidden: true, // Afficher par défaut
          },
        ],
      };
    });
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
          position: 'right',
          title: {
            display: true,
            text: 'Température (°C)'
          }
        },
        'y-axis-2': {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Quantité Produite'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    };
  }

  private extractValues(response: any[]) {
    const values = [];
    for (let i = 8; i <= 42; i += 3) {
      values.push(response[i]);
    }
    return values;
  }
}
