import { Component } from '@angular/core';
import { AuthenticationService } from './../../authentication.service';
import { Router } from '@angular/router';
import { Register } from '../../register';
import { JwtAuth } from '../../jwtAuth';
import { Login } from '../../login';

@Component({
  selector: 'app-subscribtion',
  templateUrl: './subscribtion.component.html',
  styleUrls: ['./subscribtion.component.css']
})
export class SubscribtionComponent {
  registerDto: Register = new Register();
  loginDto: Login = new Login();
  jwtDto: JwtAuth = new JwtAuth();

  constructor(private authService: AuthenticationService, private router: Router) {}

  register(registerDto: Register): void {
    this.authService.register(registerDto).subscribe(
      response => {
        console.log('Registration successful', response);
        // Handle successful registration, e.g., navigate to login
      },
      error => {
        console.error('Registration error', error);
        // Handle registration error, e.g., show error message
      }
    );
  }

}
