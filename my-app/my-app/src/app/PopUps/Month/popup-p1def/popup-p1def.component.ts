import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from './ApiService';

@Component({
  selector: 'app-popup-p1def',
  templateUrl: './popup-p1def.component.html',
  styleUrls: ['./popup-p1def.component.css']
})
export class PopupP1defComponent {
  @Output() close = new EventEmitter<void>();
  successMessage: string = '';
  errorMessage: string = '';

  selectedFile!: File;
  uploadedFilePath: string | undefined;

  currentDate: string;
  

  constructor(private apiService: ApiService) {
    const date = new Date();
    const month = date.getMonth()-1 ; // Récupère le mois -2
    const year = date.getFullYear(); // Récupère l'année actuelle
    this.currentDate = `${month.toString().padStart(2, '0')}/${year.toString()}`;
  }

  closePopup() {
    this.close.emit();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    if (this.selectedFile) {
      this.apiService.uploadExcelFile(this.selectedFile).subscribe(response => {
        this.uploadedFilePath = response.filePath; // Store the uploaded file path if needed
        this.successMessage = 'Opération réussie !';
        this.errorMessage = '';
        console.log(response);
        setTimeout(() => { // Ajout d'un délai avant de fermer le popup pour laisser le temps à l'utilisateur de voir le message
          this.closePopup();
        }, 3000); // Délai en millisecondes (ici 2000 ms = 2 secondes)
      }, error => {
        this.successMessage = '';
        this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
        console.error(error); // Handle error response
      });
    }
  }
  
}
