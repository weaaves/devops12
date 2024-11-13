import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-management';
  isLoggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: any) => {
      this.isLoggedIn = !!user;
      this.username = user ? user.username : null;
    });
  }
}
