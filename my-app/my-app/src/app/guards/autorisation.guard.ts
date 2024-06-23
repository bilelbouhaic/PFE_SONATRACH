
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['roles']; // Rôle attendu pour accéder à la route
    const userRole = this.authService.getUserRole(); // Rôle de l'utilisateur

    // Vérifier si le rôle de l'utilisateur correspond au rôle attendu
    if (expectedRole.includes(userRole)) {
      return true; // Autoriser l'accès
    } else {
      this.router.navigate(['Application/Acces']); // Rediriger vers une page non autorisée
      return false;
    }
  }
}
