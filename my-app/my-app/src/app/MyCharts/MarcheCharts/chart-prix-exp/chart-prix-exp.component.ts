import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-prix-exp',
  templateUrl: './chart-prix-exp.component.html',
  styleUrl: './chart-prix-exp.component.css'
})
export class ChartPrixExpComponent {
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Petrole',
          backgroundColor: '#F4A261',
          data: [120, 115, 130, 140, 150, 160, 170, 165, 155, 145, 135, 125]
        },
        {
          label: 'GPL',
          backgroundColor: '#264653',
          data: [80, 82, 85, 87, 89, 90, 92, 94, 93, 91, 88, 85]
        },
        {
          label: 'Condensat',
          backgroundColor: '#E9C46A',
          data: [90, 88, 85, 84, 83, 82, 80, 81, 83, 85, 87, 89]
        },
        {
          label: 'GNL',
          backgroundColor: '#42A5F5',
          data: [60, 62, 65, 67, 70, 72, 75, 78, 80, 83, 85, 88]
        }
      ]
    };

    this.options = {
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    };
  }
}

