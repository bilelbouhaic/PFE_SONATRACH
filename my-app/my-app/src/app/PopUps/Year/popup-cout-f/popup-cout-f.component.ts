import { Component , Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popup-cout-f',
  templateUrl: './popup-cout-f.component.html',
  styleUrls: ['./popup-cout-f.component.css']
})
export class PopupCoutFComponent {
  @Output() close = new EventEmitter<void>();
  
  currentDate: string;
  montantInvestGpl: number = 0; // Valeur par défaut
  montantInvestGnl: number = 0; 
  typeInvest: string = ""; // Valeur par défaut
  errorMessage: string = "";

  constructor(private http: HttpClient) {
    const date = new Date();
    const year = date.getFullYear();
    this.currentDate = `${year.toString()}`;
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit() {
    const data = [
      {
        montantInvest: this.montantInvestGnl,
        typeInvest: "CoutFGNL", // Définir le type pour GNL
        dateInvet: new Date().toISOString() // Date actuelle
      },
      {
        montantInvest: this.montantInvestGpl,
        typeInvest: "CoutFGPL", // Définir le type pour GPL
        dateInvet: new Date().toISOString() // Date actuelle
      }
    ];
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    this.http.post<any>('http://localhost:5286/api/Investissement', data, { headers }).subscribe(
      response => {
        // Gérer la réponse de l'API si nécessaire
        console.log('Réponse de l\'API:', response);
        // Réinitialiser les champs après succès
        this.montantInvestGpl = 0;
        this.montantInvestGnl = 0;
        this.errorMessage = "";
        // Fermer le popup
        this.closePopup();
      },
      error => {
        // Gérer l'erreur
        console.error('Erreur lors de la requête:', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'enregistrement.';
      }
    );
  }
  
}
