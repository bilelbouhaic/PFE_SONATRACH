import { Component , Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-popup-previsions-annuelles',
  templateUrl: './popup-previsions-annuelles.component.html',
  styleUrl: './popup-previsions-annuelles.component.css'
})
export class PopupPrevisionsAnnuellesComponent {
  @Output() close = new EventEmitter<void>();
  
  currentDate: string;
  montantInvestRD: number = 0; // Valeur par défaut
  montantInvestRA: number = 0; 
  montantInvestFF: number = 0; 

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
        montantInvest: this.montantInvestRD,
        typeInvest: "RechercheDev", // Définir le type pour GNL
        dateInvet: new Date().toISOString() // Date actuelle
      },
      {
        montantInvest: this.montantInvestRA,
        typeInvest: "RecupAssiste", // Définir le type pour GPL
        dateInvet: new Date().toISOString() // Date actuelle
      },
      {
        montantInvest: this.montantInvestFF,
        typeInvest: "FraiFormation", // Définir le type pour GPL
        dateInvet: new Date().toISOString() // Date actuelle
      }
    ];
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    this.http.post<any>('http://localhost:5286/api/Investissement', data, { headers }).subscribe(
      response => {
        // Gérer la réponse de l'API si nécessaire
        console.log('Réponse de l\'API:', response);
        // Réinitialiser les champs après succès
        this.montantInvestRA = 0;
        this.montantInvestRD = 0;
        this.montantInvestFF = 0;

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
  

  /*constructor(private myService: MyService) {}

  sendData() {
    const data = { key: 'value' }; // Replace with your data
    this.myService.postData(data).subscribe(response => {
      console.log(response); // Handle response here
    });
    
  }*/
}
