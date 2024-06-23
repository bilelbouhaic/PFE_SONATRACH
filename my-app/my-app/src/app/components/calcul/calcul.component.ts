import { Component } from '@angular/core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calcul',
  templateUrl: './calcul.component.html',
  styleUrl: './calcul.component.css'
})
export class CalculComponent {
  icon = faArrowCircleRight;
  isPopupVisible: boolean = false;
  isTrpPopupVisible: boolean = false;
  isBilanPopupVisible: boolean = false;

  togglePopup(popupType: string) {
    switch (popupType) {
      case 'popup':
        this.isPopupVisible = !this.isPopupVisible;
        break;
      case 'trpPopup':
        this.isTrpPopupVisible = !this.isTrpPopupVisible;
        break;
      case 'bilanPopup':
        this.isBilanPopupVisible = !this.isBilanPopupVisible;
        break;
      default:
        break;
    }
  }
  closePopup(popupType: string) {
    switch (popupType) {
      case 'popup':
        this.isPopupVisible = false;
        break;
      case 'trpPopup':
        this.isTrpPopupVisible = false;
        break;
      case 'bilanPopup':
        this.isBilanPopupVisible = false;
        break;
      default:
        break;
    }
  }

  constructor(private router: Router,private dataService: DataService) {}
 

  navigateToUpdate() {
    this.router.navigate(['Application/Update']);
  }

  lastUpdateData: any;

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      // Supposons que les données renvoyées par l'API sont un tableau d'objets avec les propriétés subTitle, valeur et couleur
      this.lastUpdateData = data; // Assurez-vous que les données sont dans le format approprié pour chaque instance de app-last-update
      console.log("Im here HHHH");
      
      console.log(this.lastUpdateData);
      
    });
  }
}
