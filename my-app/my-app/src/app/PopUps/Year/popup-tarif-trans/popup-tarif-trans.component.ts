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
      console.log(response); // Gérer la réponse ici

      

    });
  }

}
