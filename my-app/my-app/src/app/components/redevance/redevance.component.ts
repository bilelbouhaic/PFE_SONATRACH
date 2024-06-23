import { Component, OnInit } from '@angular/core';
import { Declaration, DeclarationsService } from './declaration-service';

@Component({
  selector: 'app-redevance',
  templateUrl: './redevance.component.html',
  styleUrl: './redevance.component.css'
})
export class RedevanceComponent implements OnInit {
  declarations: Declaration[] = [];

  constructor(private declarationsService: DeclarationsService) { }
  isPopupVisible: boolean = false;

  togglePopup(popupType: string) {
    console.log("hey");
   
        this.isPopupVisible = !this.isPopupVisible;
     
  }
  closePopup(popupType: string) {

        this.isPopupVisible = false;
  
  }

  ngOnInit(): void {
    this.declarationsService.getDeclarations().subscribe((data: Declaration[]) => {
      this.declarations = data;
      console.log(this.declarations);
    });
  }
}
