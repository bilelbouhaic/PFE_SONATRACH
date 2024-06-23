import { Component,Input } from '@angular/core';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-mybutton',
  templateUrl: './mybutton.component.html',
  styleUrl: './mybutton.component.css'
})
export class MybuttonComponent {
  icon=faArrowCircleRight;
  @Input() buttonText: string = 'Default Title';
  @Input() buttonPath: string = 'Default Title';
}
