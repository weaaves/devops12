import { Component } from '@angular/core';
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent {
  username = '';
  password = '';
  email = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.username, this.password, this.email).subscribe(
      response => {
        console.log('Registration successful', response);
        alert('Registration successful!');
      },
      error => {
        console.error('Registration error', error);
        alert('Registration failed!');
      }
    );
  }
}
