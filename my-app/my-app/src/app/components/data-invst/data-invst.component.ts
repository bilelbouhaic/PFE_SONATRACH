import { Component } from '@angular/core';

@Component({
  selector: 'app-data-invst',
  templateUrl: './data-invst.component.html',
  styleUrl: './data-invst.component.css'
})
export class DataInvstComponent {
  isPrevisionAnnuelle: boolean = false;
  isRemuneration: boolean = false;
  isImposRemu: boolean = false;
  isQteGazAchete: boolean = false;
  isCoutVisible: boolean = false;
  

  togglePopup(popupType: string) {
    switch (popupType) {
      case 'previsonAnnuellePopup':
        this.isPrevisionAnnuelle = !this.isPrevisionAnnuelle;
        break;
      case 'remunerationPopup':
        this.isRemuneration = !this.isRemuneration;
        break;
      case 'imposRemuPopup':
        this.isImposRemu = !this.isImposRemu;
        break;
      case 'qteGazPopup':
        this.isQteGazAchete = !this.isQteGazAchete;
        break;
      case 'coutPopup':
          this.isCoutVisible = !this.isCoutVisible;
        break;
      
      default:
        break;
    }
  }

  closePopup(popupType: string) {
    switch (popupType) {
      case 'previsonAnnuellePopup':
        this.isPrevisionAnnuelle = false;
        break;
      case 'remunerationPopup':
        this.isRemuneration = false;
        break;
      case 'imposRemuPopup':
        this.isImposRemu = false;
        break;
      case 'qteGazPopup':
        this.isQteGazAchete = false;
        break;
      case 'coutPopup':
        this.isCoutVisible = false;
        break;
      default:
        break;
    }
  }
}
