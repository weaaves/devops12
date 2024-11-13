import { Component } from '@angular/core';
import { AuthService } from '../../services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        alert('Login successful!');
        this.router.navigate(['/projects']);
      },
      error => {
        console.error('Login error', error);
        alert('Login failed!');
      }
    );
  }
}
