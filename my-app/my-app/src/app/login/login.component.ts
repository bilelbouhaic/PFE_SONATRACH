// login.component.ts
import { Component } from '@angular/core';
import { Login } from '../login';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginDto = new Login();
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.loginDto).subscribe(
      (response) => {
        localStorage.setItem('jwtToken', response.token);
        this.router.navigate(['/Application/Calcul']);
      },
      (error) => {
        console.error('La connexion a échoué', error);
        this.errorMessage = 'La connexion a échoué. Veuillez vérifier vos informations d\'identification.';
      }
    );
  }
}
