import { Component, Output, EventEmitter } from '@angular/core';
import { MyService } from './popup-rdv.service';

@Component({
  selector: 'app-popup-rdv',
  templateUrl: './popup-rdv.component.html',
  styleUrl: './popup-rdv.component.css',
})
export class PopupRdvComponent {
  [x: string]: any;

  @Output() close = new EventEmitter<void>();

  successMessage: string = '';
  date:string = '';
  errorMessage: string = '';
  currentDate: string = '';
  etatRdv: string = '';

  constructor(private myService: MyService) {
     const date = new Date();
     const year = date.getFullYear();
     const month = ('0' + (date.getMonth() )).slice(-2); // Ajoute un zéro devant si le mois est inférieur à 10
     const day = 10;
     this.currentDate = `${year}-${month}-${day}`;
  }
  closePopup() {
    this.close.emit();
  }

  calculateRdv() {
     if (!this.isDateValid()) {
      alert("Délai dépassé. Impossible de calculer TRP.");
      return;
    }
    console.log(this.etatRdv,this.currentDate);
    
    const data = {
      typeRdv: this.etatRdv,
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

        // Fermer le popup seulement si l'opération a réussi
        this.closePopup();
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
