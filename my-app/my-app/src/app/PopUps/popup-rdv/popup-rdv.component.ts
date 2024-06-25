import { Component, Output, EventEmitter } from '@angular/core';
import { MyService } from './popup-rdv.service';

@Component({
  selector: 'app-popup-rdv',
  templateUrl: './popup-rdv.component.html',
  styleUrls: ['./popup-rdv.component.css'],  // Updated from styleUrl to styleUrls
})
export class PopupRdvComponent {
  @Output() close = new EventEmitter<void>();

  successMessage: string = '';
  date: string = '';
  errorMessage: string = '';
  currentDate: string = '';
  etatRdv: string = '';

  constructor(private myService: MyService) {
    this.updateCurrentDate();  // Initialize the currentDate based on the initial etatRdv value
  }

  closePopup() {
    this.close.emit();
  }

  calculateRdv() {
    console.log(this.etatRdv, this.currentDate);

    const data = {
      typeRdv: this.etatRdv,
      dateRdv: this.currentDate,
    };

    console.log(data);

    this.myService.postData(data).subscribe(
      (response) => {
        this.successMessage = 'Opération réussie !';
        this.errorMessage = '';
        console.log(response);
        if (response === 200) {
          console.log(this.successMessage);
        }
      },
      (error) => {
        this.successMessage = '';
        this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
        console.error(error);
      }
    );
  }

  updateCurrentDate() {
    const date = new Date();
    let monthOffset = -1; // Default to "Provisoire"
    if (this.etatRdv === 'Definitive') {
      monthOffset = -2;
    }

    date.setMonth(date.getMonth() + monthOffset);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed in JavaScript
    const day = '10'; // Fixed day as per your requirement

    this.currentDate = `${year}-${month}-${day}`;
  }
}
