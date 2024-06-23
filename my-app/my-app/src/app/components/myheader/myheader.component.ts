import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrl: './myheader.component.css'
})
export class MyheaderComponent {
  @Input() pageTitle: string = 'Default Title';
}
