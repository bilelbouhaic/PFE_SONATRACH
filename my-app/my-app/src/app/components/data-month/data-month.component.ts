import { Component } from '@angular/core';

@Component({
  selector: 'app-data-month',
  templateUrl: './data-month.component.html',
  styleUrls: ['./data-month.component.css'] // Use 'styleUrls' instead of 'styleUrl'
})
export class DataMonthComponent {
  isPrixExVisible: boolean = false;
  isTauxCHVisible: boolean = false;
  isQteVisible: boolean = false;
  isP1defVisible: boolean = false;
  isP1provVisible: boolean = false;

  togglePopup(popupType: string) {
    switch (popupType) {
      case 'prixExPopup':
        this.isPrixExVisible = !this.isPrixExVisible;
        break;
      case 'tauxCHPopup':
        this.isTauxCHVisible = !this.isTauxCHVisible;
        break;
      case 'qtePopup':
        this.isQteVisible = !this.isQteVisible;
        break;
      case 'p1defPopup':
        this.isP1defVisible = !this.isP1defVisible;
        break;
      case 'p1provPopup':
        this.isP1provVisible = !this.isP1provVisible;
        break;
      default:
        break;
    }
  }

  closePopup(popupType: string) {
    switch (popupType) {
      case 'prixExPopup':
        this.isPrixExVisible = false;
        break;
      case 'tauxCHPopup':
        this.isTauxCHVisible = false;
        break;
      case 'qtePopup':
        this.isQteVisible = false;
        break;
      case 'p1defPopup':
        this.isP1defVisible = false;
        break;
      case 'p1provPopup':
        this.isP1provVisible = false;
        break;
      default:
        break;
    }
  }
}
