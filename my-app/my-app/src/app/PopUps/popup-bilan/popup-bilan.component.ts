import { Component, EventEmitter, Output } from '@angular/core';
import { BilanService } from './popup-bilan.service';

@Component({
  selector: 'app-popup-bilan',
  templateUrl: './popup-bilan.component.html',
  styleUrls: ['./popup-bilan.component.css']
})
export class PopupBilanComponent {
  @Output() close = new EventEmitter<void>();

  selectedType: string = ''; // Property to store the selected type
  selectedDate: string = ''; // Property to store the selected date

  constructor(private bilanService: BilanService) { }

  closeBilanPopup() {
    this.close.emit();
  }

  imprimerBilan() {
    if (this.selectedDate) {
      this.bilanService.generateBilanPDF(this.selectedDate).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Open the PDF in a new tab
      });
    } else {
      alert('Veuillez sélectionner une date.');
    }
  }
}
