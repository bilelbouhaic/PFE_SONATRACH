import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-qteprod',
  templateUrl: './popup-qteprod.component.html',
  styleUrl: './popup-qteprod.component.css'
})
export class PopupQteprodComponent {
  @Output() close = new EventEmitter<void>();
 
  closePopup() {
    this.close.emit();
  }

  currentDate: string;

  constructor() {
    const date = new Date();
    const month = date.getMonth() ; // Récupère le mois precedent
    const year = date.getFullYear(); // Récupère l'année actuelle
    this.currentDate = `${month.toString().padStart(2, '0')}/${year.toString()}`;
  }
}
