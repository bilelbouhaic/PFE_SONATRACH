import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-remuneration',
  templateUrl: './popup-remuneration.component.html',
  styleUrl: './popup-remuneration.component.css'
})
export class PopupRemunerationComponent {
  @Output() close = new EventEmitter<void>();
 
  closePopup() {
    this.close.emit();
  }
  currentDate: string;

  constructor() {
    const date = new Date();
    const month = date.getMonth()+1 ; // Récupère le mois actuel
    const year = date.getFullYear(); // Récupère l'année actuelle
    this.currentDate = `${month.toString().padStart(2, '0')}/${year.toString()}`;
  }


  /*constructor(private myService: MyService) {}

  sendData() {
    const data = { key: 'value' }; // Replace with your data
    this.myService.postData(data).subscribe(response => {
      console.log(response); // Handle response here
    });
    
  }*/
}
