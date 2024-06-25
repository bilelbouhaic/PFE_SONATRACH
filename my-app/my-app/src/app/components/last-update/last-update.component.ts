import { Component, Input } from '@angular/core';
import {faCloud, faDollarSign} from '@fortawesome/free-solid-svg-icons'
import { HttpClient } from '@angular/common/http';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-last-update',
  templateUrl: './last-update.component.html',
  styleUrl: './last-update.component.css'
})
export class LastUpdateComponent {
  dollar=faDollarSign

  @Input() subTitle: string = 'Default Title';
  @Input() valeur: string="";
  @Input() couleur: string = '#c388f670';
  @Input() icone: IconProp = faCloud;

 
  /*we should send 
  -a color  
  -an icon 
  -a value
  dynamically
  */
}
