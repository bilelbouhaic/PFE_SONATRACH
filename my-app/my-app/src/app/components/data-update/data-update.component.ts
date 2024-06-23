import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-update',
  templateUrl: './data-update.component.html',
  styleUrl: './data-update.component.css'
})

export class DataUpdateComponent {
  constructor(private router: Router) { }

  navigateToMonth() {
    this.router.navigate(['Application/Month']);
  }
  navigateToYear() {
    this.router.navigate(['Application/Year']);
  }
  navigateToInvest() {
    this.router.navigate(['Application/Investissement']);
  }
}
