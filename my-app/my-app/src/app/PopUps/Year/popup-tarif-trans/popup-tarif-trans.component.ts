import { Component, EventEmitter, Output } from '@angular/core';
import { MyService } from './popup-tarif-trans.service';
@Component({
  selector: 'app-popup-tarif-trans',
  templateUrl: './popup-tarif-trans.component.html',
  styleUrl: './popup-tarif-trans.component.css'
})
export class PopupTarifTransComponent {
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
        tarifTransport: this.petrolePrice,
        dateModificationTt: new Date().toISOString()
      },
      {
        produitId: 2,
        tarifTransport: this.gazPrice,
        dateModificationTt: new Date().toISOString()
      },
      {
        produitId: 3,
        tarifTransport: this.condensatPrice,
        dateModificationTt: new Date().toISOString()
      },
      {
        produitId: 4,
        tarifTransport: this.gplPrice,
        dateModificationTt: new Date().toISOString()
      }
    ];
    this.myService.postData(data).subscribe(response => {
      this.successMessage = 'Mise à jour effectuée avec succès !';
      this.errorMessage = '';
     
    }, error => {
      this.successMessage = '';
      this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
      console.error(error); 
    });

  }

}
