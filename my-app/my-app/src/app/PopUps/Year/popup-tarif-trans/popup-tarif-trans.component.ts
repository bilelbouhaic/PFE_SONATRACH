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
      console.log(response); // Gérer la réponse ici

      

    });
  }

}
