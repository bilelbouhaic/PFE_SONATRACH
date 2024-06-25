import { Component, Output, EventEmitter } from '@angular/core';
import { MyService } from './popup-taux-ch.service';
@Component({
  selector: 'app-popup-taux-ch',
  templateUrl: './popup-taux-ch.component.html',
  styleUrl: './popup-taux-ch.component.css'
})
export class PopupTauxChComponent {

  @Output() close = new EventEmitter<void>();

  tauxCh: number = 0;
  currentDate: string;
  successMessage: string = '';
  errorMessage: string = '';
  closePopup() {
    this.close.emit();
  }



  constructor(private myService: MyService) {
    const date = new Date();
    this.currentDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  sendData() {
    const data = [
      {
        tauxChange: this.tauxCh,
        dateModificationPb: new Date()
      },
      
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
