import { Component, Output, EventEmitter } from '@angular/core';
import { MyService } from './popup-prix-exp.service';

@Component({
  selector: 'app-popup-prix-exp',
  templateUrl: './popup-prix-exp.component.html',
  styleUrls: ['./popup-prix-exp.component.css']
})
export class PopupPrixExpComponent {
  @Output() close = new EventEmitter<void>();
  
  petrolePrice: number = 0;
  gazPrice: number = 0;
  condensatPrice: number = 0;
  gplPrice: number = 0;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private myService: MyService) {}

  closePopup() {
    this.close.emit();
  }

  sendData() {
    const data = [
      {
        produitId: 1,
        prixBase: this.petrolePrice,
        dateModificationPb: new Date().toISOString()
      },
      {
        produitId: 2,
        prixBase: this.gazPrice,
        dateModificationPb: new Date().toISOString()
      },
      {
        produitId: 3,
        prixBase: this.condensatPrice,
        dateModificationPb: new Date().toISOString()
      },
      {
        produitId: 4,
        prixBase: this.gplPrice,
        dateModificationPb: new Date().toISOString()
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
