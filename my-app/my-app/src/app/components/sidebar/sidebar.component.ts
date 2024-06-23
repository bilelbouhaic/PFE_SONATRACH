import { Component } from '@angular/core';
import { faHome, faChartLine, faCalculator, faChartSimple, faOilWell, faCircleDollarToSlot, faFileInvoiceDollar, faFileArrowDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  logoutt=faRightFromBracket;
  home = faHome;
  stat = faChartLine;
  calcul = faCalculator;
  chart = faChartSimple;
  Oil = faOilWell;
  dollar = faCircleDollarToSlot;
  trp = faFileInvoiceDollar;
  rdv = faFileArrowDown;

  constructor(private authService: AuthenticationService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
