import { Component, EventEmitter, Output } from '@angular/core';
import { MyService } from './popup-prix-mn.service';
@Component({
  selector: 'app-popup-prix-mn',
  templateUrl: './popup-prix-mn.component.html',
  styleUrls: ['./popup-prix-mn.component.css'] 
})
export class PopupPrixMNComponent {
  @Output() close = new EventEmitter<void>();

  successMessage: string = '';
  errorMessage: string = '';
  
  petrolePrice: number = 0;
  gazPrice: number = 0;
  condensatPrice: number = 0;
  gplPrice: number = 0;

  constructor(private myService: MyService) {}

  closePopup() {
    this.close.emit();
  }

  sendData() {
    const data = [
      {
        produitId: 1,
        prixMn: this.petrolePrice,
        datemodificationPm: new Date().toISOString()
      },
      {
        produitId: 2,
        prixMn: this.gazPrice,
        datemodificationPm: new Date().toISOString()
      },
      {
        produitId: 3,
        prixMn: this.condensatPrice,
        datemodificationPm: new Date().toISOString()
      },
      {
        produitId: 4,
        prixMn: this.gplPrice,
        datemodificationPm: new Date().toISOString()
      }
    ];
    
    this.myService.postData(data).subscribe(response => {
      this.successMessage = 'Opération réussie !';
        //this.errorMessage = '';
        //console.log(response); // Gérer la réponse ici
        // Fermer le popup seulement si l'opération a réussi
        this.closePopup();
    },

    error => {
      this.successMessage = '';
      this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
      console.error(error); // Gérer l'erreur ici
    }
  );
  }

}
