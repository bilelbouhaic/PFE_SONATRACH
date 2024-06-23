import { TrpgetService, Trp } from './trp.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-trp',
  templateUrl: './trp.component.html',
  styleUrl: './trp.component.css'
})
export class TrpComponent implements OnInit {
  declarations: Trp[] = [];

  constructor(private TrpgetService: TrpgetService) { }
  isPopupVisible: boolean = false;

  togglePopup(popupType: string) {
    console.log("hey");
   
        this.isPopupVisible = !this.isPopupVisible;
     
  }
  closePopup(popupType: string) {

        this.isPopupVisible = false;
  
  }

  ngOnInit(): void {
    this.TrpgetService.getDeclarations().subscribe((data: Trp[]) => {
      this.declarations = data;
      console.log(this.declarations);
    });
  }
}
