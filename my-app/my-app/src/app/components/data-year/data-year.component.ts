import { Component } from '@angular/core';

@Component({
  selector: 'app-data-year',
  templateUrl: './data-year.component.html',
  styleUrl: './data-year.component.css'
})
export class DataYearComponent {

  isPrixMnVisible: boolean = false;
  istarifTransVisible: boolean = false;
  

  togglePopup(popupType: string) {
    switch (popupType) {
      case 'prixMnPopup':
        this.isPrixMnVisible = !this.isPrixMnVisible;
        break;
      
      case 'TransPopup':
        this.istarifTransVisible = !this.istarifTransVisible;
        break;
      default:
        break;
    }
  }

  closePopup(popupType: string) {
    switch (popupType) {
      case 'prixMN':
        this.isPrixMnVisible = false;
        break;
      
      case 'TransPopup':
        this.istarifTransVisible = false;
        break;
      default:
        break;
    }
  }
}
