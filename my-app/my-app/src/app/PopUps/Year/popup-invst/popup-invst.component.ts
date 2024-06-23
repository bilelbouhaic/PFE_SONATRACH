import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-invst',
  templateUrl: './popup-invst.component.html',
  styleUrl: './popup-invst.component.css'
})
export class PopupInvstComponent {
  @Output() close = new EventEmitter<void>();
  closePopup() {
    this.close.emit();
  }

  currentDate: string;

  constructor() {
    const date = new Date();
    const month = date.getMonth() +1; // Récupère le mois actuel
    const year = date.getFullYear(); // Récupère l'année actuelle
    this.currentDate = `${month.toString().padStart(2, '0')}/${year.toString()}`;
  } 
}
