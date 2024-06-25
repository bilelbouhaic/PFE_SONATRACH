import { Component } from '@angular/core';
import { faHome, faChartLine, faCalculator, faChartSimple, faOilWell, faCircleDollarToSlot, faFileInvoiceDollar, faFileArrowDown, faRightFromBracket, faAdd } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  add = faAdd;
  logoutt = faRightFromBracket;
  home = faHome;
  stat = faChartLine;
  calcul = faCalculator;
  chart = faChartSimple;
  Oil = faOilWell;
  dollar = faCircleDollarToSlot;
  trp = faFileInvoiceDollar;
  rdv = faFileArrowDown;

  isAdmin: boolean = false; // Flag to check if user is admin

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'Admin'; // Vérifiez que isAdmin est correctement défini en fonction du rôle
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
