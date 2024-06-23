import { Component, EventEmitter, Output } from '@angular/core';
import { MyTrpService } from './popup-trp.service';

@Component({
  selector: 'app-popup-trp',
  templateUrl: './popup-trp.component.html',
  styleUrl: './popup-trp.component.css',
})
export class PopupTrpComponent {
  @Output() close = new EventEmitter<void>();

  currentDate: string;
  tauxTrp: number | null = null; 
  successMessage: string = '';
  errorMessage: string = '';


  constructor(private myService: MyTrpService) {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant si le mois est inférieur à 10
    const day = 16;
    this.currentDate = `${year}-${month}-${day}`;
  }
  closeTrpPopup() {
    this.close.emit();
  }

  calculateTrp() {

    if (!this.isDateValid()) {
      alert('Délai dépassé. Impossible de calculer TRP.');
      return;
    }
    const data = {
      tauxRdv: this.tauxTrp,
      dateRdv: this.currentDate,
    };

    console.log(data);

    this.myService.postData(data).subscribe(
      (response) => {
        this.successMessage = 'Opération réussie !';
        this.errorMessage = '';
        console.log(response); // Gérer la réponse ici
        if ((response = 200)) {
          console.log(this.successMessage);
        }
      },

      (error) => {
        this.successMessage = '';
        this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
        console.error(error); // Gérer l'erreur ici
      }
    );
  }

  isDateValid(): boolean {
    const currentDate = new Date();
    const selectedDateParts = this.currentDate.split('/');
    const selectedYear = parseInt(selectedDateParts[2]);
    const selectedMonth = parseInt(selectedDateParts[1]) - 1; // Les mois commencent à partir de zéro
    const selectedDay = parseInt(selectedDateParts[0]);

    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
    return currentDate <= selectedDate;
  }
}
